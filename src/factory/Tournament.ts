import * as _ from 'lodash'
import { DateTime, Duration } from 'luxon'
import { factory } from 'factory-bot'
import opts from './opts';
import { Tournament } from '../entity/Tournament';

factory.define('tournament', Tournament, {
  id: factory.seq('Tournament.id', (n) => n),
  name: factory.chance('sentence'),
  subject: factory.chance('word'),
  author: factory.assoc('user', 'email'),
  startTime: () => DateTime.now().plus(Duration.fromMillis(_.random(1000000, 1000000000))).toJSDate(),
  maxApplications: () => _.random(10, 1000),
  applicationDeadline: () => DateTime.now().plus(Duration.fromMillis(_.random(100000, 500000000))).toJSDate(),
}, opts)