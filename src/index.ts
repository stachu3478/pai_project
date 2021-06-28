import "reflect-metadata";
import {createConnection, getRepository} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import RouteRegistry from "./routes/Registry";
import * as cookieparser from 'cookie-parser'
import * as session from 'express-session'
import seeds from "./seeds";
import ormconfig from "../ormconfig";
import './utils/env'

createConnection(ormconfig).then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.set('view engine', 'pug');
    app.set('views','./src/view');
    app.use(cookieparser());
    app.use(session({
        secret: process.env.SESSION_SECRET || 'secret',
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 60 * 60 * 1000,
            secure: process.env.NODE_ENV === 'production'
        }
    }));

    // register static files hosting
    app.use(express.static('src/public'))

    // register express routes from defined application routes
    new RouteRegistry(app).register()

    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    // save some records for test
    seeds(connection)

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
