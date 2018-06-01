import {EhTemplate} from './eh-template';

import {BaseInfo} from '../../interfaces/base-info';
import {FileContent} from '../../interfaces/file-content';
import {BaseBuilder} from '../../interfaces/base-builder';
import {EpubFiles} from '../../interfaces/epub-files';


/**
 * This is a template for epub3 based on: https://github.com/IDPF/epub3-samples/tree/master/30/wasteland/EPUB
 * Template for epub Creation.
 *
 * @author Giorgio Modoni <g.modoni@olivettiscuoladigitale.it>
 */
export class EhBuilder extends BaseBuilder {

    template: any;
    mediaType: string = 'text/html';
    ext: string = 'html';
    sectionTag: string = 'class';

    constructor() {
        super();
        this.template = new EhTemplate();
        Object.assign(this.fileNames, {
            cover: 'cover.html',
            nav: 'ebook-nav.html',
            container: 'container.xml',
            content: 'ebook-content.html'
        });
    }
}