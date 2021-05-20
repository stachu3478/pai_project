import {UserController} from "../controller/UserController";

export const Routes = [{
    method: "get",
    route: "users/",
    controller: UserController,
    action: "index"
}, {
    method: "get",
    route: "users/:id",
    controller: UserController,
    action: "show"
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
}];