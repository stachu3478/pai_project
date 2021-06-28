import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Tournament } from "./Tournament";

@Entity()
export class Sponsor {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Tournament)
    tournaments: Tournament[]

    get logoUrl() {
        return `/logos/${this.id % 10}.jpg`
    }
}
