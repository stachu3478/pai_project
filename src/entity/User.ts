import {Entity, Column, PrimaryColumn, Check} from "typeorm";

@Entity()
export class User {

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Check('/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i')
    @PrimaryColumn()
    email: string;

    @Column()
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
}
