import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { MinLength, Min, Validate, Max } from "class-validator"
import { User } from "./User";
import { LaterThan } from "../validator/LaterThan";
import { LaterThanNow } from "../validator/LaterThanNow";
import { Sponsor } from "./Sponsor";

@Entity()
export class Tournament {

    @PrimaryGeneratedColumn()
    id: number;

    @MinLength(3)
    @Column()
    name: string;

    @MinLength(2)
    @Column()
    subject: string;

    @ManyToOne('User')
    author: User;

    @Validate(LaterThan, ['applicationDeadline'])
    @Column('datetime')
    startTime: Date

    @Min(-90)
    @Max(90)
    @Column('double')
    locationLatitude: number

    @Min(-180)
    @Max(180)
    @Column('double')
    locationLongitude: number

    @Min(2)
    @Column()
    maxApplications: number

    @Validate(LaterThanNow)
    @Column('datetime')
    applicationDeadline: Date

    @JoinTable()
    @ManyToMany(() => Sponsor)
    sponsors: Sponsor[]
}
