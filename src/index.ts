import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {User} from "./entity/User";
import RouteRegistry from "./routes/Registry";
import * as cookieparser from 'cookie-parser'
import * as session from 'express-session'

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.set('view engine', 'pug');
    app.set('views','./src/views');
    app.use(cookieparser());
    app.use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 10000
        }
    }));

    // register express routes from defined application routes
    new RouteRegistry(app).register()

    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    // insert new users for test
    await connection.manager.save(connection.manager.create(User, {
        firstName: "Timber",
        lastName: "Saw",
        email: 'test',
        passwordHash: 'hashedpass'
    }));
    await connection.manager.save(connection.manager.create(User, {
        firstName: "Phantom",
        lastName: "Assassin",
        email: 'test2',
        passwordHash: 'mypass'
    }));

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
