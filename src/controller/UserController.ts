import {getRepository, DeepPartial} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";

export class UserController {

    private userRepository = getRepository(User);

    async index(request: Request, response: Response, next: NextFunction) {
        response.render('users/index', {
            users: await this.userRepository.find()
        })
    }

    async new(request: Request, response: Response, next: NextFunction) {
        const user = this.userRepository.create()
        response.render('users/new', { user })
    }

    async show(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.params.id);
    }

    async create(request: Request, response: Response, next: NextFunction) {
        const user = this.userRepository.create(request.body as DeepPartial<User>)
        this.userRepository.save(user)
            .then(() => {
                response.redirect('users/index')
            })
            .catch(() => {
                response.render('users/new', { user })
            })
    }

}