import { FileContent } from './interfaces/file-content';
import { BaseInfo } from './interfaces/base-info';
import { CssDef } from './interfaces/css-def';
import { Nav } from './interfaces/nav';
import { Asset } from './interfaces/asset';
import { JsDef } from './interfaces/js-def';
import { MetaDef } from './interfaces/meta-def';
/**
 * Prepare data for Template
 *
 * Guide IDPF:
 * Tag structure:
 * https://idpf.github.io/a11y-guidelines/content/semantics/epub-type.html
 *
 * @author Giorgio Modoni <g.modoni@olivettiscuoladigitale.it>
 */
export declare class BuilderLoader {
    private builder;
    private utils;
    constructor(models: any);
    /**
     * Load specific template class
     *
     * @param models - a template name
     */
    getBuilder(models: string): void;
    /**
     * Get template for mimetype file
     * @returns {FileContent}
     */
    mimetype(): FileContent;
    /**
     * Get container.xml file
     *
     * @returns {FileContent}
     */
    container(): FileContent;
    /**
     * Create package file
     * This the most important file!.
     *
     *
     * @param prop - epub properties
     * @param css - css array definition
     * @param assets - assets array definition
     * @returns {{name: string, folder: string, content: string}}
     */
    opf(chapters: any, prop: BaseInfo, css?: CssDef[], assets?: Asset[]): {
        name: string;
        folder: string;
        content: string;
    };
    /**
     * Create a hrml/xhtml navigation
     *
     * @param navigation - navigation data object
     * @param css - stylesheet array data
     * @returns {{name: string, folder: string, content: string}}
     */
    nav(navigation: Nav, css?: CssDef[]): {
        name: string;
        folder: string;
        content: string;
    };
    /**
     * Generate  ncx file for epub2 and for epub3 compatibility with epub2
     *
     * @param prop -  epub properties
     * @param navigation - navigarion object data
     * @returns {{name: string, folder: string, content: string}}
     */
    ncx(prop: BaseInfo, navigation: Nav): {
        name: string; /**
         * Get container.xml file
         *
         * @returns {FileContent}
         */
        folder: string;
        content: string;
    };
    /**
     * Generate a chapter content
     *
     * @param prop - epub properties
     * @param body - content string
     * @param css - stylesheet array
     * @returns {{name: string, folder: string, content: string}}
     */
    contentBody(prop: BaseInfo, body: any, css?: CssDef[], jss?: JsDef[], metas?: MetaDef[]): {
        name: string;
        folder: string;
        content: string;
    };
    /**
     * Create a Page for cover.
     * This is optional
     *
     * @param prop - epub properties
     * @param css - stylesheet array
     * @returns {{name: string, folder: string, content: string}}
     */
    cover(prop: BaseInfo, css?: CssDef[]): {
        name: string;
        folder: string;
        content: string;
    };
    getExt(): string;
    /**
     * Get section tag.
     * This is the tag inside "section" and it's different between html and xhtml epub template
     *
     * @returns {string}
     */
    getSectionTag(): string;
    /**
     * Generate a string of landmark used in opf data
     * @param data - landmarks data
     * @returns {string}
     * @private
     */
    private _navLandmarks;
    private _navToc;
    private _ncxToc;
    private _cssTags;
    private _jsTags;
    private _metaTags;
    private _opfCss;
    private _metadata;
    private _manifest;
    private _spine;
}
