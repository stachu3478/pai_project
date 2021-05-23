import { factory } from 'factory-bot'
import { User } from '../entity/User';
import opts from './opts';

factory.define('user', User, {
  firstName: factory.chance('first'),
  lastName: factory.chance('last'),
  email: factory.chance('email'),
}, opts)