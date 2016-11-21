import { BaseInfo } from "./interfaces/base-info";
import { CssDef } from "./interfaces/css-def";
import { Assets } from "./interfaces/assets";
import { Chapters } from "./interfaces/chapters";
/**
 * Create a Epub Compliant Idpf book
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
     * @type {{toc: Array; landmarks: Array}}
     */
    private navigation;
    /**
     * Template class
     */
    private parser;
    /**
     * Asset image data
     * @type {Array}
     */
    private assets;
    /**
     * Template model string data
     * @type {string}
     */
    private templateModel;
    private chapters;
    constructor();
    /**
     * Create a default values for epub creation
     */
    setDefaultBaseInfo(): void;
    /**
     * Set specific template for epub creation.
     * Available: epub3 (default), epub3html, epub2
     *
     * More template can be available in future
     *
     * @param model template model
     */
    template(model?: string): void;
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
     * @param name - filename
     * @param content - epub string contet
     */
    content(name: string, content: string): void;
    /**
     * Add a cover page by default if exist properties.cover.file
     *
     * @returns {boolean}
     */
    cover(): boolean;
    /**
     * Add all content's chapters
     */
    chapterAll(): void;
    /**
     * Add a chapter as new file
     *
     * @param chapter -  chapter object
     */
    addChapter(chapter: Chapters): void;
    /**
     * Add content as section and structures.
     * Section is a portion of chapter contents.
     * You can add more section for a chapter.
     *
     * epubCreator.addSection(mysectioncontent, "chapter01");
     * epubCreator.addSection(myothersection, "chapter01");
     *
     * @param epubSections - epub section object
     * @param name - chapter name
     */
    addSections(epubSections: any, name?: string): void;
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
     * @param options - jszip options object
     * @param folder - folder path
     * @returns {Promise<T>}
     */
    _addAsset(data: string, fileName: string, options?: any, folder?: string): Promise<any>;
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
     * @param folder - folder path
     * @returns {Promise<T>}
     */
    _addAssetWithPath(path: string, name?: string, folder?: string): Promise<any>;
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
    blobUrl(): Promise<any>;
    /**
     * Genrate result as arrayBuffer,
     * usefull to pass as file to epub reader
     *
     * @returns {Promise<T>}
     */
    asArrayBuffer(): Promise<any>;
    /**
     * Generate a file Url,
     * this is the most compatible way and to pass data as blob Url
     *
     * @returns {Promise<T>}
     */
    asBase64(): Promise<any>;
    /**
     * Download Epub
     *
     *
     * @param fileName
     * @returns {Promise<T>}
     */
    download(fileName?: string): Promise<any>;
}
