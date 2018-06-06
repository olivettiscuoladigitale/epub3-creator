import { BaseBuilder } from '../../interfaces/base-builder';
/**
 * This is a template for epub3 based on: https://github.com/IDPF/epub3-samples/tree/master/30/wasteland/EPUB
 * Template for epub Creation.
 *
 * @author Giorgio Modoni <g.modoni@olivettiscuoladigitale.it>
 */
export declare class EhBuilder extends BaseBuilder {
    template: any;
    mediaType: string;
    ext: string;
    sectionTag: string;
    constructor();
}
