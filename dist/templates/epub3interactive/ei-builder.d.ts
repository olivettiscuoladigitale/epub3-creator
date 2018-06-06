import { BaseBuilder } from '../../interfaces/base-builder';
import { BaseTemplate } from '../../interfaces/base-template';
/**
 * This is a template for epub3 based on: pubcoder example
 * Template for epub Creation.
 *
 * @author @author Marco Bergantin <m.bergantin@olivettiscuoladigitale.it>
 */
export declare class EiBuilder extends BaseBuilder {
    template: BaseTemplate;
    mediaType: string;
    ext: string;
    sectionTag: string;
    constructor();
}
