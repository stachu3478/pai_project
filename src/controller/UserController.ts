import {getRepository, DeepPartial} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import { validate } from "class-validator";

export class UserController {

    private userRepository = getRepository(User);

    async index(request: Request, response: Response, next: NextFunction) {
        
        response.render('users/index', {
            notice: request.cookies.notice || 'twoj stary pijany',
            users: await this.userRepository.find()
        })
    }

    async new(request: Request, response: Response, next: NextFunction) {
        const user = this.userRepository.create()
        response.render('users/new', { ...request.cookies, user, notice: 'xd?' })
    }

    async show(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.params.id);
    }

    async create(request: Request, response: Response, next: NextFunction) {
        const user = this.userRepository.create(request.body as DeepPartial<User>)
        validate(user).then(errors => {
            if (errors.length) {
                response.status(422).render('users/new', { errors })
            } else {
                this.userRepository.insert(user)
                response.cookie('notice', 'User saved successfully', { maxAge: 1000 })
                response.redirect('users')
            }
        }).catch(errors => {
            response.status(500).end('Internal server error')
            console.log(errors)
        })
    }

}