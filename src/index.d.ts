import { BaseInfo } from "./interfaces/base-info";
import { CssDef } from "./interfaces/css-def";
import { Assets } from "./interfaces/assets";
/**
 * Create a Epub 3 Compliant Idpf file
 *
 *
 * @author Giorgio Modoni <g.modoni@alfabook.it>
 */
export declare class EpubCreator {
    /**
     * JSZip internal
     */
    private epubZip;
    /**
     * Utils class
     */
    private utils;
    /**
     * Base epub properties
     */
    properties: BaseInfo;
    /**
     * Epub content as string
     *
     * @type {string}
     */
    epubContent: string;
    /**
     * Custom css
     * @type {Array}
     */
    private css;
    /**
     * Navigation menu and properties
     *
     * @type {{toc: Array; landmarks: Array}}
     */
    private navigation;
    /**
     * Template class
     */
    private parser;
    /**
     * Asset image data
     *
     * @type {Array}
     */
    private assets;
    constructor();
    /**
     * Create a default values for epub creation
     */
    setDefaultBaseInfo(): void;
    /**
     * Set specific template for epub creation,
     * default epub3
     *
     * More template can be available in future
     *
     * @param models template model
     */
    template(models?: string): void;
    /**
     * Add mimetype
     */
    mimetype(): void;
    /**
     * Create basic container file
     */
    container(): void;
    /**
     * Create opf file
     */
    opf(): void;
    /**
     * Create navigation file for epub3
     */
    nav(): void;
    /**
     * Create ncx menu for epub2 compatibility
     */
    ncx(): void;
    /**
     * Add contento to epub
     *
     * @param content - epub string contet
     */
    content(content: string): void;
    cover(): void;
    /**
     * Add content as section and structures
     *
     * @param epubSections - epub section object
     */
    addSections(epubSections: any): string;
    /**
     * Add css file and populate css value for proper ocx
     *
     * @param cssDef - css object
     * @returns {Promise<T>}
     */
    addCss(cssDef: CssDef): Promise<{}>;
    /**
     * Add image assets
     *
     * @param asset - image asset object
     * @returns {Promise<T>}
     */
    addAsset(asset: Assets): Promise<{}>;
    /**
     * Before start injecting document, add id if not preset
     */
    assignIdAsset(): void;
    /**
     * Create epub
     *
     * @returns {Promise<T>}
     * @private
     */
    _prepare(): Promise<{}>;
    /**
     * Add cover add a special asseect, cover image
     * Cover is set in properties.cover
     *
     * @returns {Promise<T>}
     * @private
     */
    private _addCover();
    /**
     * Add asset to Epub
     *
     * @param data - base64/binary data
     * @param fileName - file name
     * @returns {Promise<T>}
     */
    _addAsset(data: string, fileName: string, options?: any): Promise<any>;
    /**
     * Add data as base 64
     * @param data - data encode as base64
     * @param fileName - file name
     * @returns {Promise<T>}
     */
    _addAssetAsBase64(data: string, fileName: string): Promise<any>;
    /**
     * Add data with file path
     *
     * @param path - file path
     * @param name - file name
     * @returns {Promise<T>}
     */
    _addAssetWithPath(path: string, name?: string): Promise<any>;
    /**
     * Populate landmark navigation object
     *
     * @param data - landmark
     * @private
     */
    _addNavLandmarks(data: any): void;
    /**
     * Add navigation toc
     *
     * @param id - string id
     * @param label - toc label
     * @private
     */
    _addNavToc(id: string, label: string): void;
    /**
     * Navigation Toc
     *
     * @param epubSections
     * @returns {string}
     * @private
     */
    _addSections(epubSections: any): string;
    /**
     * Create blob url, usefull
     * to render epub and pass to your epub
     * reader without saving it to file
     *
     * @returns {Promise<T>}
     */
    blobUrl(): Promise<{}>;
    asArrayBuffer(): Promise<{}>;
    /**
     * Generate a file Url,
     * this is the most compatible way and to pass data to your favourite reader or save to db.
     * @returns {Promise<T>}
     */
    dataUrl(): Promise<{}>;
    /**
     * Generate a file Url,
     * this is the most compatible way and to pass data to your favourite reader or save to db.
     * @returns {Promise<T>}
     */
    stringUrl(): Promise<{}>;
    /**
     * Download Epub
     *
     *
     * @param fileName
     * @returns {Promise<T>}
     */
    download(fileName?: string): any;
}
