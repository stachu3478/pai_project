import {Entity, Column, PrimaryColumn, Check} from "typeorm";
import { IsEmail, Length, MinLength, Validate } from "class-validator"
import bcrypt from 'bcrypt'
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

    @Column({
        nullable: true
    })
    activationCode: string;

    @Column({
        default: false
    })
    active: boolean;

    @Column({
        nullable: true
    })
    recoveryCode: string;

    @Column({
        default: false
    })
    recovering: boolean;

    passwordMathes(val: string) {
        return bcrypt.compareSync(val, this.passwordHash);
    }

    set password(val: string) {
        this.passwordHash = bcrypt.hashSync(val, 10);
    }
}
