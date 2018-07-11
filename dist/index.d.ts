import { Asset } from './interfaces/asset';
import { BaseInfo } from './interfaces/base-info';
import { Chapters } from './interfaces/chapters';
import { CssDef } from './interfaces/css-def';
import { JsDef } from './interfaces/js-def';
import { MetaDef } from './interfaces/meta-def';
import { ZipExportType } from './interfaces/zip-export-types';
/**
 * Create a Epub Compliant Idpf book
 *
 * @author Giorgio Modoni <g.modoni@olivettiscuoladigitale.it>
 */
export declare class EpubCreator {
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
     * JSZip internal
     */
    private epubZip;
    /**
     * Utils class
     */
    private utils;
    /**
     * Custom css
     * @type {Array}
     */
    private css;
    /**
     * Custom js files/inline
     * @type {Array}
     */
    private jss;
    /**
     * Navigation menu and properties
     * @type {{toc: Array; landmarks: Array}}
     */
    private navigation;
    /**
     * Template class
     */
    private builder;
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
    constructor(template?: string);
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
     * Add content to epub
     * @param name - filename
     * @param content - epub string content
     * @param metadata - chapter header metadata
     */
    content(name: string, content: string, metadata?: MetaDef[]): void;
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
     * Add css file and populate css value for proper ocx
     *
     * @param jsDef - js object
     * @returns {Promise<T>}
     */
    addJs(jsDef: JsDef): Promise<{}>;
    /**
     * Add image assets
     *
     * @param asset - image asset object
     * @returns {Promise<T>}
     */
    addAsset(asset: Asset): Promise<{}>;
    /**
     * Before start injecting document, add id if not preset
     */
    assignIdAsset(): void;
    /**
     * Generate result as arrayBuffer,
     * usefull to pass as file to epub reader
     *
     * @returns {Promise<T>}
     */
    exportAs(type: ZipExportType): Promise<any>;
    /**
     * Generate result as arrayBuffer,
     * useful to pass as file to epub reader
     *
     * @returns {Promise<T>}
     */
    asBlob(): Promise<Blob>;
    /**
     * Create blob url, useful
     * to render epub and pass to your epub
     * reader without saving it to file
     *
     * @returns {Promise<T>}
     */
    blobUrl(): Promise<any>;
    /**
     * Generate result as arrayBuffer,
     * useful to pass as file to epub reader
     *
     * @returns {Promise<T>}
     */
    asArrayBuffer(): Promise<ArrayBuffer>;
    /**
     * Generate a file Url,
     * this is the most compatible way and to pass data as blob Url
     *
     * @returns {Promise<T>}
     */
    asBase64(): Promise<string>;
    /**
     * Download Epub
     *
     *
     * @param fileName
     * @returns {Promise<T>}
     */
    download(fileName?: string): Promise<any>;
    /**
     * Create epub
     *
     * @returns {Promise<T>}
     * @private
     */
    private _prepare;
    /**
     * Add data as base 64
     * @param data - data encode as base64
     * @param fileName - file name
     * @returns {Promise<T>}
     */
    private _addAssetAsBase64;
    /**
     * Add navigation toc
     *
     * @param id - string id
     * @param label - toc label
     * @private
     */
    private _addNavToc;
    /**
     * Navigation Toc
     *
     * @param epubSections
     * @returns {string}
     * @private
     */
    private _addSections;
    /**
     * Add asset to Epub
     *
     * @param data - base64/binary data
     * @param fileName - file name
     * @param options - jszip options object
     * @param folder - folder path
     * @returns {Promise<T>}
     */
    private _addAsset;
    /**
     * Add data with file path
     *
     * @param path - file path
     * @param name - file name
     * @param folder - folder path
     * @returns {Promise<T>}
     */
    private _addAssetWithPath;
    /**
     * Populate landmark navigation object
     *
     * @param data - landmark
     * @private
     */
    private _addNavLandmarks;
    /**
     * Create a default values for epub creation
     */
    private setDefaultBaseInfo;
    /**
     * Add cover add a special asseect, cover image
     * Cover is set in properties.cover
     *
     * @returns {Promise<T>}
     * @private
     */
    private _addCover;
}
