
import * as FileSaver from "file-saver";
import * as JSZip from "jszip";
import * as JSZipUtils from "jszip-utils";

import {Assets} from "./interfaces/assets";
import {BaseInfo} from "./interfaces/base-info";
import {Chapters} from "./interfaces/chapters";
import {CssDef} from "./interfaces/css-def";
import {FileContent} from "./interfaces/file-content";
import {FileInfo} from "./interfaces/file-info";
import {Nav} from "./interfaces/nav";
import {TemplateParser} from "./template-parser";
import {Utils} from "./utils";

/**
 * Create a Epub Compliant Idpf book
 *
 * @author Giorgio Modoni <g.modoni@olivettiscuoladigitale.it>
 */
export class EpubCreator {

    /**
     * JSZip internal
     */
    private epubZip: any;

    /**
     * Utils class
     */
    private utils: Utils;

    /**
     * Base epub properties
     */
    public properties: BaseInfo;

    /**
     * Epub content as string
     * @type {string}
     */
    public epubContent: string = "";

    /**
     * Custom css
     * @type {Array}
     */
    private css: any = [];

    /**
     * Navigation menu and properties
     * @type {{toc: Array; landmarks: Array}}
     */
    private navigation: Nav = {
        "toc": [],
        "landmarks": []
    };

    /**
     * Template class
     */
    private parser: any;

    /**
     * Asset image data
     * @type {Array}
     */
    private assets: Assets[] = [];

    /**
     * Template model string data
     * @type {string}
     */
    private templateModel: string = "epub3";


    private chapters: Chapters[] = [];


    constructor() {
        this.epubZip = new JSZip(); // get Jszip for epub compress
        this.utils = new Utils(); // load utils class
        this.setDefaultBaseInfo(); // set default value
        this.parser = new TemplateParser("epub3");
    }

    /**
     * Create a default values for epub creation
     */
    setDefaultBaseInfo() {
        this.properties = {
            uuid: "github.com/bbottema/js-epub-maker::it-came-from::example-using-idpf-wasteland",
            author: "Olivetti Scuola Digitale",
            language: "it-IT",
            modificationDate: new Date().toString(),
            rights: {
                description: "This work is shared with the public using the Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0) license.",
                license: "http://creativecommons.org/licenses/by-sa/3.0/"
            },
            attributionUrl: "https://www.olivettiscuoladigitale.it",
            cover: {
                file: "",
                license: "http://creativecommons.org/licenses/by-sa/3.0/",
                mediaType: "image/jpeg",
                attributionUrl: "https://www.olivettiscuoladigitale.it",
                inline: "no"
            },
            title: "Book Title",
            publicationDate: new Date().toString()
        };
    }

    /**
     * Set specific template for epub creation.
     * Available: epub3 (default), epub3html, epub2
     *
     * More template can be available in future
     *
     * @param model template model
     */
    template(model: string = "epub3") {

        this.templateModel = model;
        this.parser = new TemplateParser(model);
    }

    /**
     * Add mimetype
     */
    mimetype() {
        let fileContent: FileContent = this.parser.mimetype();
        let folder = this.epubZip.folder(fileContent.folder);
        folder.file(fileContent.name, fileContent.content);
    }

    /**
     * Create basic container file
     */
    container() {
        let fileContent: FileContent = this.parser.container();
        let folder = this.epubZip.folder(fileContent.folder);
        folder.file(fileContent.name, fileContent.content);
    }

    /**
     * Create opf file
     */
    opf() {
        let fileContent: FileContent = this.parser.opf(this.chapters, this.properties, this.css, this.assets);
        let folder = this.epubZip.folder(fileContent.folder);
        folder.file(fileContent.name, fileContent.content);
    }

    /**
     * Create navigation file for epub3
     */
    nav() {
        let fileContent: FileContent = this.parser.nav(this.navigation, this.css);
        let folder = this.epubZip.folder(fileContent.folder);
        folder.file(fileContent.name, fileContent.content);
    }

    /**
     * Create ncx menu for epub2 compatibility
     */
    ncx() {
        let fileContent: FileContent = this.parser.ncx(this.properties, this.navigation);
        let folder = this.epubZip.folder(fileContent.folder);
        folder.file(fileContent.name, fileContent.content);
    }

    /**
     * Add contento to epub
     * @param name - filename
     * @param content - epub string contet
     */
    content(name: string, content: string) {
        let fileContent: FileContent = this.parser.contentBody(this.properties, content, this.css);
        let folder = this.epubZip.folder(fileContent.folder);

        folder.file(name + "." + this.parser.getExt(), fileContent.content);
    }

    /**
     * Add a cover page by default if exist properties.cover.file
     *
     * @returns {boolean}
     */
    cover() {
        if (!this.properties.cover.asFileName)
            return false;

        let fileContent: FileContent = this.parser.cover(this.properties, this.css);

        this.addChapter({
            name: "cover",
            content: fileContent.content,
            inline: this.properties.cover.inline,
            id: "cover",
            asfirst: true
        });

    }

    /**
     * Add all content's chapters
     */
    chapterAll() {
        for (let chapter of this.chapters) {
            this.content(chapter.name, chapter.content);
        }
    }

    /**
     * Add a chapter as new file
     *
     * @param chapter -  chapter object
     */
    addChapter(chapter: Chapters) {
        if (!chapter.id)
            chapter.id = "ch_" + name;

        if (!chapter.inline)
            chapter.inline = "yes";

        if (!chapter.content)
            chapter.content = "";


        if (chapter.asfirst)
            this.chapters.unshift(chapter);
        else
            this.chapters.push(chapter);

    }

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
    addSections(epubSections, name: string = "ebook-content") {

        let content: string = this._addSections(epubSections);
        let item = this.chapters.find((el) => el.name === name);

        if (item)
            item.content += content;
        else
            this.addChapter({name: name, content: content});

    }

    /**
     * Add css file and populate css value for proper ocx
     *
     * @param cssDef - css object
     * @returns {Promise<T>}
     */
    addCss(cssDef: CssDef) {
        return new Promise((resolve, reject) => {

            if (cssDef.content) {
                this._addAsset(cssDef.content, cssDef.name).then(
                    (fileName) => {
                        this.css.push({"name": fileName, type: "day"});
                        return resolve(true);
                    },
                    (err) => reject(err)
                );

            } else {
                if (!cssDef.name) {
                    const fileInfo: FileInfo = this.utils.getFileNameFromPath(cssDef.path);
                    cssDef.name = fileInfo.fullName;
                }

                this._addAssetWithPath(cssDef.path, cssDef.name).then(
                    () => {
                        this.css.push({"name": cssDef.name, type: "day"});
                        return resolve(true);
                    },
                    (err) => reject(err)
                );
            }

        });
    }

    /**
     * Add image assets
     *
     * @param asset - image asset object
     * @returns {Promise<T>}
     */
    addAsset(asset: Assets) {
        return new Promise((resolve, reject) => {

            let name: string;
            let path: string;
            let fileInfo: FileInfo;
            let options: any = {};

            if (asset.content) {

                if (asset.base64)
                    options.base64 = true;

                fileInfo = this.utils.getFileNameFromPath(asset.name);
                name = fileInfo.fullName;
                path = fileInfo.path;

                this._addAsset(asset.content, name, options, path).then(
                    (fileName) => {
                        this.assets.push({"name": asset.name, mediaType: asset.mediaType, id: asset.id});
                        return resolve(true);
                    },
                    (err) => reject(err)
                );

            } else {

                if (!asset.name) {
                    fileInfo = this.utils.getFileNameFromPath(asset.path);
                    asset.name = fileInfo.fullName;
                    path = "";
                } else {
                    fileInfo = this.utils.getFileNameFromPath(asset.name);
                    name = fileInfo.fullName;
                    path = fileInfo.path;
                }

                this._addAssetWithPath(asset.path, name, path).then(
                    () => {
                        this.assets.push({"name": asset.name, mediaType: asset.mediaType, id: asset.id});
                        return resolve(true);
                    },
                    (err) => reject(err)
                );
            }

        });
    }

    /**
     * Before start injecting document, add id if not preset
     */
    assignIdAsset() {
        let i = 0;
        for (let a of this.assets) {
            if (!a.id) {
                a.id = "asset_" + i;
            }

            i++;
        }
    }

    /**
     * Create epub
     *
     * @returns {Promise<T>}
     * @private
     */
    _prepare() {
        return new Promise((resolve, reject): any => {

            let promises = [];

            promises.push(this._addCover());

            Promise.all(promises).then(
                () => {

                    this.cover();
                    this.assignIdAsset();
                    this.mimetype();
                    this.container();
                    this.nav();
                    this.ncx();
                    this.chapterAll();
                    this.opf(); // this must be the last

                    return resolve();
                },
                (err) => reject(err)
            );

        });
    }

    /**
     * Add cover add a special asseect, cover image
     * Cover is set in properties.cover
     *
     * @returns {Promise<T>}
     * @private
     */
    private _addCover() {
        return new Promise((resolve, reject) => {

            // if no cover ok -> skip and return true
            if (!this.properties.cover.file && !this.properties.cover.base64)
                return resolve(true);

            // we have a base64 data but no name for file, ok assuming is a jpg
            if (!this.properties.cover.asFileName)
                this.properties.cover.asFileName = "cover.png";

            if (this.properties.cover.base64) {

                this._addAssetAsBase64(this.properties.cover.base64, this.properties.cover.asFileName);

                return resolve(true);

            } else {

                const fileInfo: FileInfo = this.utils.getFileNameFromPath(this.properties.cover.file);

                this._addAssetWithPath(this.properties.cover.file, fileInfo.fullName).then(
                    () => resolve(true)
                    , (err) => reject(err)
                );
            }

        });
    }

    /**
     * Add asset to Epub
     *
     * @param data - base64/binary data
     * @param fileName - file name
     * @param options - jszip options object
     * @param folder - folder path
     * @returns {Promise<T>}
     */
    _addAsset(data: string, fileName: string, options: any = {}, folder: string = ""): Promise<any> {
        return new Promise((resolve) => {

            // all files are under EPUB dir, if not start with / we need to add it
            if (folder !== "" && folder.charAt(0) !== "/")
                folder = "/" + folder;

            this.epubZip.folder("EPUB" + folder).file(fileName, data, options);

            return resolve(fileName);
        });
    }

    /**
     * Add data as base 64
     * @param data - data encode as base64
     * @param fileName - file name
     * @returns {Promise<T>}
     */
    _addAssetAsBase64(data: string, fileName: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._addAsset(fileName, data, {base64: true}).then(
                (result) => resolve(result),
                (err) => reject(err)
            );
        });
    }

    /**
     * Add data with file path
     *
     * @param path - file path
     * @param name - file name
     * @param folder - folder path
     * @returns {Promise<T>}
     */
    _addAssetWithPath(path: string, name?: string, folder: string = ""): Promise<any> {
        return new Promise((resolve, reject) => {

            if (!name) {
                const fileInfo: FileInfo = this.utils.getFileNameFromPath(this.properties.cover.file);
                name = fileInfo.fullName;
            }

            JSZipUtils.getBinaryContent(path, (err, data) => {
                if (err)
                    return reject(err);

                this._addAsset(data, name, {binary: true}, folder).then(
                    (result) => resolve(result),
                    (err) => reject(err)
                );
            });

        });

    }

    /**
     * Populate landmark navigation object
     *
     * @param data - landmark
     * @private
     */
    _addNavLandmarks(data) {
        if (data.tag === "section" && data.name === "frontmatter") {
            this.navigation.landmarks.push({type: "frontmatter", href: "ebook-content.xhtml#frontmatter"});
        }

        if (data.tag === "section" && data.name === "bodymatter") {
            this.navigation.landmarks.push({type: "bodymatter", href: "ebook-content.xhtml#bodymatter"});
        }

        if (data.tag === "section" && data.name === "backmatter") {
            this.navigation.landmarks.push({type: "backmatter", href: "ebook-content.xhtml#backmatter"});
        }

    }

    /**
     * Add navigation toc
     *
     * @param id - string id
     * @param label - toc label
     * @private
     */
    _addNavToc(id: string, label: string) {
        this.navigation.toc.push({label: label, href: "ebook-content.xhtml#" + id, id: id});
    }

    /**
     * Navigation Toc
     *
     * @param epubSections
     * @returns {string}
     * @private
     */
    _addSections(epubSections: any): string {

        let sectionAsText = "";
        let progressiveId = 0;

        for (let data of epubSections) {

            let id = data.id ? data.id : data.name + "_" + progressiveId;
            let content: string = "";

            if (Array.isArray(data.content))
                content = this._addSections(data.content);
            else
                content = data.content;

            if (data.navLabel)
                this._addNavToc(id, data.navLabel);

            if (data.tag && data.tag !== "html") {

                this._addNavLandmarks(data);

                let epubType = "";
                if (data.name)
                    epubType = `${this.parser.getSectionTag()}="${data.name}"`;

                sectionAsText += `
                    <${data.tag} ${epubType} id="${id}">
                        ${content}
                    </${data.tag}>`;
            } else {
                sectionAsText += content;
            }

            progressiveId++;
        }

        return sectionAsText;
    }

    /**
     * Create blob url, usefull
     * to render epub and pass to your epub
     * reader without saving it to file
     *
     * @returns {Promise<T>}
     */
    blobUrl(): Promise<any> {
        return new Promise((resolve, reject): any => {
            this._prepare().then(
                () => {

                    this.epubZip.generateAsync({type: "blob"})
                        .then((content) => {
                                let epub: any = URL.createObjectURL(content);

                                return resolve(epub);
                            },
                            (err) => reject(err)
                        );

                },
                (err) => {
                    console.log("Download error on insert asset data: ", err);
                    return reject(err);
                }
            );
        });
    }


    /**
     * Genrate result as arrayBuffer,
     * usefull to pass as file to epub reader
     *
     * @returns {Promise<T>}
     */
    asArrayBuffer(): Promise<any> {
        return new Promise((resolve, reject): any => {
            this._prepare().then(
                () => {
                    this.epubZip.generateAsync({type: "arraybuffer"}).then(
                        (content) => resolve(content),
                        (err) => reject(err)
                    );
                },
                (err) => {
                    console.log("Download error on insert asset data: ", err);
                    return reject(err);
                }
            );
        });
    }

    /**
     * Generate a file Url,
     * this is the most compatible way and to pass data as blob Url
     *
     * @returns {Promise<T>}
     */
    asBase64(): Promise<any> {
        return new Promise((resolve, reject): any => {
            this._prepare().then(
                () => {

                    this.epubZip.generateAsync({type: "base64"}).then((base64) => {

                        return resolve(base64);
                    });

                },
                (err) => {
                    console.log("Download error on insert asset data: ", err);
                    return reject(err);
                }
            );
        });
    }


    /**
     * Download Epub
     *
     *
     * @param fileName
     * @returns {Promise<T>}
     */
    download(fileName ?: string): Promise<any> {
        return new Promise((resolve, reject): any => {
            this._prepare().then(
                () => {

                    if (!fileName)
                        fileName = this.utils.getTimeStamp() + ".epub";

                    this.epubZip.generateAsync({type: "blob"})
                        .then((content) => {
                            FileSaver.saveAs(content, fileName);
                            return resolve(true);
                        });

                },
                (err) => {
                    console.log("Download error on insert asset data:", err);
                    return reject(err);
                }
            );
        });

    }


}
