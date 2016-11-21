import {StaticTemplate} from "./static-template";

import {BaseInfo} from "../../interfaces/base-info";
import {FileContent} from "../../interfaces/file-content";


/**
 * This is a template for epub3 based on: https://github.com/IDPF/epub3-samples/tree/master/30/wasteland/EPUB
 * Template for epub Creation.
 *
 * @author Giorgio Modoni <g.modoni@alfabook.it>
 */
export class Epub3HtmlTemplate {

    staticTemplate: any;
    mediaType: string = "text/html";
    ext: string = "html";
    sectionTag: string = "class";

    constructor() {
        this.staticTemplate = new StaticTemplate();
    }

    public getMimetype(): FileContent {
        let content: string = this.staticTemplate._mimetype();

        return {
            name: "mimetype",
            folder: "",
            content: content
        };
    }

    public getContainer(): FileContent {
        let content: string = this.staticTemplate._container();

        return {
            name: "container.xml",
            folder: "META-INF",
            content: content
        };
    }

    public getOpf(prop: BaseInfo, metadataCoverFragment: string, manifestFragment: string, spine: string) {
        let content: string = this.staticTemplate._opf(prop, metadataCoverFragment, manifestFragment, spine);

        return {
            name: "ebook.opf",
            folder: "EPUB",
            content: content
        };
    }

    public getNav(cssFiles: string, landmarks: string, toc: string) {
        let content: string = this.staticTemplate._nav(cssFiles, landmarks, toc);

        return {
            name: "ebook-nav.html",
            folder: "EPUB",
            content: content
        };
    }

    public getNcx(prop: BaseInfo, toc: string) {
        let content: string = this.staticTemplate._ncx(prop, toc);

        return {
            name: "ebook.ncx",
            folder: "EPUB",
            content: content
        };
    }

    public getContentBody(prop: BaseInfo, body: string, cssFiles: string) {
        let content: string = this.staticTemplate._contentBody(prop, body, cssFiles);

        return {
            name: "ebook-content.html",
            folder: "EPUB",
            content: content
        };
    }

    public getCover(prop: BaseInfo, css: string) {
        let content: string = this.staticTemplate._cover(prop, css);

        return {
            name: "cover.html",
            folder: "EPUB",
            content: content
        };
    }


}