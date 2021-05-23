import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, getRepository} from "typeorm";
import { MinLength, Min, MinDate } from "class-validator"
import { User } from "./User";
import AppEntity from "./AppEntity";

@Entity()
export class Tournament extends AppEntity<Tournament> {
    repository = getRepository(Tournament)

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

    @MinDate(new Date())
    @Column('datetime')
    startTime: Date

    // TODO location

    @Min(2)
    @Column()
    maxApplications: number

    @MinDate(new Date()) // TODO not later than start time
    @Column('datetime')
    applicationDeadline: Date

    // TODO sponsors
}
