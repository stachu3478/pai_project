import {UserController} from "../controller/UserController";
import { TournamentController } from "../controller/TournamentController";
import { SessionController } from "../controller/users/SessionController";
import { RootController } from "../controller/RootController";
import PasswordRecoveryController from "../controller/users/PasswordRecoveryController";
import AppController from "../controller/AppController";
import { PasswordController } from "../controller/users/PasswordController";

export interface Route<T> {
    method: 'get' | 'post' | 'patch' | 'put' | 'delete'
    route: string,
    controller: T & AppController,
    action?: keyof T
}

export const Routes: Route<any>[] = [{
    method: "get",
    route: "/",
    controller: RootController
}, {
    method: "get",
    route: "users/new",
    controller: UserController
}, {
    method: "post",
    route: "users/",
    controller: UserController
}, {
    method: "get",
    route: "tournaments/",
    controller: TournamentController
}, {
    method: "get",
    route: "tournaments/new",
    controller: TournamentController
}, {
    method: "post",
    route: "tournaments/",
    controller: TournamentController
}, {
    method: "get",
    route: "tournaments/edit",
    controller: TournamentController
}, {
    method: "post",
    route: "tournaments/update",
    controller: TournamentController
}, {
    method: "get",
    route: "users/sessions/new",
    controller: SessionController
}, {
    method: "post",
    route: "users/sessions/",
    controller: SessionController
}, {
    method: "get",
    route: "users/password_recovery/new",
    controller: PasswordRecoveryController
}, {
    method: "post",
    route: "users/password_recovery/",
    controller: PasswordRecoveryController
}, {
    method: "get",
    route: "users/passwords/new",
    controller: PasswordController
}, {
    method: "post",
    route: "users/passwords/",
    controller: PasswordController
}, {
    method: "get",
    route: "users/sessions/destroy",
    controller: SessionController
}];