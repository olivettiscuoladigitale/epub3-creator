import {E3Template} from './e3-template';

import {BaseInfo} from '../../interfaces/base-info';
import {FileContent} from '../../interfaces/file-content';
import {BaseBuilder} from '../../interfaces/base-builder';


/**
 * This is a template for epub3 based on: https://github.com/IDPF/epub3-samples/tree/master/30/wasteland/EPUB
 * Template for epub Creation.
 *
 * @author Giorgio Modoni <g.modoni@olivettiscuoladigitale.it>
 */
export class E3Builder extends BaseBuilder {

    constructor() {
        super();
        this.template = new E3Template();
    }

}