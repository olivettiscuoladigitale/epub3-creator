declare var require: any;

import * as JSZip from 'jszip';
import * as FileSaver from "file-saver";
import {Utils} from './utils';

import {Epub3Template} from './templates/epub3/epub3';
import {Sections} from './sections';

import {FileContent} from './interfaces/file-content';
import {BaseInfo} from './interfaces/base-info';
import {FileInfo} from './interfaces/file-info';
import {CssDef} from './interfaces/css-def';

var JSZipUtils = require('jszip-utils');


/**
 * Create a Epub 3 Compliant Idpf file
 *
 * @autor Giorgio Modoni <g.modoni@alfabook.it>
 */
export class EpubCreator {

    private epubZip: any;
    private utils: Utils;
    public properties: BaseInfo;
    public sections: Sections;
    private templateClass: any;
    public epubContent: string = "";
    private css: any = [];


    constructor() {
        this.epubZip = new JSZip(); // get Jszip for epub compress
        this.utils = new Utils(); // load utils class
        this.sections = new Sections();
        this.setDefaultBaseInfo(); // set default value
    }

    /**
     * Create a default values for epub creation
     */
    setDefaultBaseInfo() {
        this.properties = {
            uuid: "github.com/bbottema/js-epub-maker::it-came-from::example-using-idpf-wasteland",
            author: "Alfabook",
            language: "it-IT",
            modificationDate: new Date().toString(),
            rights: {
                description: "This work is shared with the public using the Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0) license.",
                license: "http://creativecommons.org/licenses/by-sa/3.0/"
            },
            attributionUrl: "https://www.alfabook.it",
            cover: {
                file: "",
                license: "http://creativecommons.org/licenses/by-sa/3.0/",
                mediaType: "image/jpeg",
                attributionUrl: "https://www.alfabook.it"
            },
            title: "Book Title",
            publicationDate: new Date().toString()
        }
    }

    /**
     * Set specific template for epub creation,
     * default epub3
     *
     * More template can be available in future
     *
     * @param models template model
     */
    template(models?: string) {
        if (!models || models === 'epub3')
            this.templateClass = new Epub3Template();
    }

    /**
     * Add mimetype
     */
    mimetype() {
        let fileContent: FileContent = this.templateClass.mimetype();
        let folder = this.epubZip.folder(fileContent.folder);
        folder.file(fileContent.name, fileContent.content);
    }

    container() {
        let fileContent: FileContent = this.templateClass.container();
        let folder = this.epubZip.folder(fileContent.folder);
        folder.file(fileContent.name, fileContent.content);
    }

    opf() {
        let fileContent: FileContent = this.templateClass.opf(this.properties, this.css);
        let folder = this.epubZip.folder(fileContent.folder);
        folder.file(fileContent.name, fileContent.content);
    }

    nav() {
        let fileContent: FileContent = this.templateClass.nav();
        let folder = this.epubZip.folder(fileContent.folder);
        folder.file(fileContent.name, fileContent.content);
    }

    ncx() {
        let fileContent: FileContent = this.templateClass.ncx(this.properties);
        let folder = this.epubZip.folder(fileContent.folder);
        folder.file(fileContent.name, fileContent.content);
    }

    content(content: string) {
        let fileContent: FileContent = this.templateClass.contentBody(this.properties, content, this.css);
        let folder = this.epubZip.folder(fileContent.folder);
        folder.file(fileContent.name, fileContent.content);
    }

    addSections(epubSections) {
        this.epubContent += this.sections.addSections(epubSections);

        console.log(this.epubContent);
    }

    addCss(cssDef: CssDef) {
        return new Promise((resolve, reject) => {

            if (cssDef.content) {
                this.addAsset(cssDef.content, cssDef.name).then(
                    (fileName) => {
                        this.css.push({"name": fileName, type: "day"});
                        return resolve(true)
                    },
                    (err) => reject(err)
                )
            } else {
                this.addAssetWithPath(cssDef.path, cssDef.name).then(
                    () => {

                        resolve(true)
                    },
                    (err) => reject(err)
                )
            }

        });
    }

    _prepare() {
        return new Promise((resolve, reject): any => {

            if (!this.templateClass)
                this.template();

            var promises = [];

            promises.push(this._addCover());

            Promise.all(promises).then(
                ()=> {
                    this.mimetype();
                    this.container();
                    this.opf();
                    this.nav();
                    this.ncx();
                    this.content(this.epubContent);

                    return resolve();
                },
                (err) => {

                    return reject(err)
                }
            );

        });
    }

    private _addCover() {
        return new Promise((resolve, reject) => {

            // if no cover ok -> skip and return true
            if (!this.properties.cover.file && !this.properties.cover.base64)
                return resolve(true);

            // we have a base64 data but no name for file, ok assuming is a jpg
            if (!this.properties.cover.asFileName)
                this.properties.cover.asFileName = "cover.jpg";

            if (this.properties.cover.base64) {

                this.addAssetAsBase64(this.properties.cover.base64, this.properties.cover.asFileName);

                return resolve(true);

            } else {

                const fileInfo: FileInfo = this.utils.getFileNameFromPath(this.properties.cover.file);

                this.addAssetWithPath(this.properties.cover.file, fileInfo.fullName).then(
                    () => resolve(true)
                    , (err) => reject(err)
                );
            }

        });
    }

    addAsset(data: string, fileName: string): Promise<any> {
        return new Promise((resolve) => {
            this.epubZip.folder('EPUB').file(fileName, data);

            return resolve(fileName);
        })
    }

    addAssetAsBase64(data: string, fileName: string): Promise<any> {
        return new Promise((resolve) => {
            this.epubZip.folder('EPUB').file(fileName, data, {base64: true});

            return resolve(fileName);
        })
    }

    addAssetWithPath(path: string, name?: string): Promise<any> {
        return new Promise((resolve, reject) => {

            if (!name) {
                const fileInfo: FileInfo = this.utils.getFileNameFromPath(this.properties.cover.file);
                name = fileInfo.fullName
            }

            JSZipUtils.getBinaryContent(path, (err, data) => {
                if (err)
                    return reject(err);

                this.epubZip.folder('EPUB').file(name, data, {binary: true});

                return resolve(name);
            });
        })

    }

    blobUrl() {
        return new Promise((resolve, reject): any => {
            this._prepare().then(
                ()=> {
                    this.epubZip.generateAsync({type: "blob"})
                        .then((content) => resolve(URL.createObjectURL(content))
                            , (err) => reject(err)
                        );
                },
                (err)=> {
                    console.log("Download error on insert asset data: ", err);
                }
            );
        });
    }

    download(fileName?: string): any {
        this._prepare().then(
            ()=> {
                console.log("OK");

                this.epubZip.generateAsync({type: "blob"})
                    .then((content) => {
                        FileSaver.saveAs(content, fileName);
                    });


            },
            (err)=> {
                console.log("Download error on insert asset data: ", err);
            }
        );

    }


}

var content = [
    {
        tag: "section", name: "frontmatter", "content": [
        {
            tag: "section", name: "titlepage", "content": [
            {tag: "html", content: "<h1>The Waste Land</h1> 	<div class='aut'>T.S. Eliot</div>"},
            {
                tag: "div",
                name: "epigraph",
                content: "<span xml:lang=\"la\">\"Nam Sibyllam quidem Cumis ego ipse oculismeis<br />vidi in ampulla pendere, et cum illi pueri dicerent</span>: <br /> "
            },
        ]
        }
    ]
    },
    {tag: "section", name: "bodymatter", "content": "ciao sono un contenuto"}
];


let epubCreator = new EpubCreator();

epubCreator.template('epub3');
epubCreator.properties.title = "Alfabook book title";
epubCreator.properties.cover.file = "./demo/cover.jpg";
epubCreator.addSections(content);
epubCreator.addCss({"content": "body: margin:0", "name": "base.css"});
epubCreator.download();
//epubCreator.blobUrl().then( (content) =>console.log(content), (err) => console.log(err));
