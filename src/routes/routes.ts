import {UserController} from "../controller/UserController";
import { TournamentController } from "../controller/TournamentController";

export const Routes = [{
    method: "get",
    route: "users/",
    controller: UserController,
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
}];