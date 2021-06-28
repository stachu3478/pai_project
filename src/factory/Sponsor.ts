import * as _ from 'lodash'
import { factory } from 'factory-bot'
import opts from './opts';
import { Sponsor } from '../entity/Sponsor';

factory.define('sponsor', Sponsor, {
  id: factory.seq('Sponsor.id', (n) => n),
  name: factory.chance('sentence', { words: 3 }),
}, opts)