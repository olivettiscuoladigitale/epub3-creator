import {E2Template} from './e2-template';
import {BaseBuilder} from '../../interfaces/base-builder';

export class E2Builder extends BaseBuilder {

    constructor() {
        super();
        this.template = new E2Template();
    }
}