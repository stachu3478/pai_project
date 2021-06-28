import { v4 } from 'uuid'
import {Entity, Column, PrimaryColumn, Index } from "typeorm";
import { IsEmail, MinLength, Validate } from "class-validator"
import * as bcrypt from 'bcrypt'
import { UniqueEmail } from "../validator/UniqueEmail";

@Entity()
export class User {

    @MinLength(2)
    @Column()
    firstName: string;

    @MinLength(2)
    @Column()
    lastName: string;

    @IsEmail()
    @PrimaryColumn()
    @Validate(UniqueEmail)
    email: string;

    @Column({
        nullable: true
    })
    passwordHash: string;

    @Index({ unique: true })
    @Column({
        nullable: true
    })
    activationCode: string;

    @Column({
        default: false
    })
    active: boolean;

    rotateActivationCode() {
        this.active = false
        this.activationCode = v4()
    }

    passwordMathes(val: string) {
        if (!this.passwordHash) return false
        return bcrypt.compareSync(val, this.passwordHash);
    }

    get activationUrl() {
        return `${process.env.SERVER_HOST}/users/passwords/new?email=${this.email}&activationCode=${this.activationCode}`
    }

    set password(val: string) {
        this.passwordHash = bcrypt.hashSync(val, 10);
    }
}
