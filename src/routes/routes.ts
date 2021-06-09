import {UserController} from "../controller/UserController";
import { TournamentController } from "../controller/TournamentController";
import { SessionController } from "../controller/users/SessionController";
import { RootController } from "../controller/RootController";

export const Routes = [{
    method: "get",
    route: "/",
    controller: RootController,
    action: "index"
}, {
    method: "get",
    route: "users/new",
    controller: UserController,
    action: "new"
}, {
    method: "post",
    route: "users/",
    controller: UserController,
    action: "create"
}, {
    method: "get",
    route: "tournaments/",
    controller: TournamentController,
    action: "index"
}, {
    method: "get",
    route: "tournaments/new",
    controller: TournamentController,
    action: "new"
}, {
    method: "post",
    route: "tournaments/",
    controller: TournamentController,
    action: "create"
}, {
    method: "get",
    route: "users/sessions/new",
    controller: SessionController,
    action: "new"
}, {
    method: "post",
    route: "users/sessions/",
    controller: SessionController,
    action: "create"
}];