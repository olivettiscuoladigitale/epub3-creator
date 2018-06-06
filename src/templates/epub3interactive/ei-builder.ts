import {EiTemplate} from './ei-template';
import {BaseBuilder} from '../../interfaces/base-builder';
import {BaseTemplate} from '../../interfaces/base-template';


/**
 * This is a template for epub3 based on: pubcoder example
 * Template for epub Creation.
 *
 * @author @author Marco Bergantin <m.bergantin@olivettiscuoladigitale.it>
 */
export class EiBuilder extends BaseBuilder {

    template: BaseTemplate;
    mediaType: string = 'application/xhtml+xml';
    ext: string = 'xhtml';
    sectionTag: string = 'epub:type';

    constructor() {
        super();
        this.template = new EiTemplate();
        this.fileNames = Object.assign(this.fileNames, {
            cover: 'cover.html',
            nav: 'ebook-nav.xhtml',
            container: 'container.xml',
            content: 'ebook-content.html'
        });
    }
}