import * as _ from 'lodash'
import AppController from './AppController';
export class RootController extends AppController {
    index() {
        this.response.redirect('/tournaments')
    }
}