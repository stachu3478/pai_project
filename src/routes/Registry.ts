import * as express from "express";
import { Router } from "express";
import { Routes, Route } from "./routes";

export default class RouteRegistry {
  private app: express.Express
  private routers: { [key: string]: Router } = {}

  constructor(app: express.Express) {
    this.app = app
  }

  register() {
    Routes.forEach(route => {
      const fullPath = route.route
      const router = this.findRouter(fullPath)
      const path = this.findPath(fullPath)
      const action = this.getRouteAction(route)
      router[route.method](path, (req: express.Request, res: express.Response, next: Function) => {
        const controller = (new (route.controller as any)(req, res, next))
        const errorHandler = this.catchErrors(res)
        if (!controller || !controller[action] || path !== req.path) {
          console.log('Warning. Skipping route.', fullPath)
          next()
          return
        }
        controller.beforeAction().then(() => {
          let result;
          try {
            result = controller[action]();
          } catch(err) {
            errorHandler(err)
          }
          if (result instanceof Promise) {
              result
                .then(result => result !== null && result !== undefined ? res.send(result) : undefined)
                .catch(errorHandler)
          } else if (result !== null && result !== undefined) {
              res.json(result);
          } else res.end()
        }).catch(errorHandler)
      });
    });
  }

  private catchErrors(res: express.Response) {
    return (err: any) => {
      console.error(err)
      res.end('Internal server error.')
    }
  }

  private getRouteAction(route: Route<any>) {
    if (route.action) {
      return route.action
    }
    if (route.route.endsWith('/')) {
      if (route.method === 'get') {
        return 'index'
      } if (route.method === 'post') {
        return 'create'
      }
    }
    return route.route.slice(route.route.lastIndexOf('/') + 1)
  }

  private findRouter(path: String) {
    const splitPath = path.split('/')
    let router: express.Router = this.app
    while (splitPath.length > 1) {
      const dir = splitPath.shift()
      let newRouter = this.routers[dir]
      if (!newRouter) {
        newRouter = this.routers[dir] = express.Router()
        router.use(`/${dir}`, newRouter)
      }
      router = newRouter
    }
    return router
  }

  private findPath(path: String) {
    const splitPath = path.split('/')
    return `/${splitPath.pop()}`
  }
}