import * as express from "express";
import { Router } from "express";
import { Routes } from "./routes";

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
      router[route.method](path, (req: express.Request, res: express.Response, next: Function) => {
        const controller = (new (route.controller as any)(req, res, next))
        if (!controller || !controller[route.action] || path !== req.path) {
          next()
          return
        }
        controller.beforeAction()
        const result = controller[route.action]();
        if (result instanceof Promise) {
            result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);
        } else if (result !== null && result !== undefined) {
            res.json(result);
        } else res.end()
      });
    });
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