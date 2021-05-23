import { factory } from 'factory-bot'
import './User'
import './Tournament'
import TypeormAdapter from './TypeormAdapter';

factory.setAdapter(new TypeormAdapter())