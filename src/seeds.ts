import { factory } from 'factory-bot'
import { Connection } from "typeorm";
import './factory/index'
import { Sponsor } from './entity/Sponsor';
import { Tournament } from './entity/Tournament';

export default async function seeds(connection: Connection) {
  await factory.createMany('user', 10)
  await factory.createMany('tournament', 20)
  await factory.createMany('sponsor', 10)
  const tournamentRepo = connection.getRepository(Tournament)
  const sponsors = await connection.getRepository(Sponsor).find()
  const tournaments = await tournamentRepo.find()
  tournaments.forEach(tournament => {
    const tournamentSponsors = []
    sponsors.forEach(sponsor => {
      if (Math.random() > 0.5) {
        tournamentSponsors.push(sponsor)
      }
    })
    tournament.sponsors = tournamentSponsors
    tournamentRepo.save(tournament)
  })
}