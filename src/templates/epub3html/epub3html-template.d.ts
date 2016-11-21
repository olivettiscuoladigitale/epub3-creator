import { BaseInfo } from "../../interfaces/base-info";
import { FileContent } from "../../interfaces/file-content";
/**
 * This is a template for epub3 based on: https://github.com/IDPF/epub3-samples/tree/master/30/wasteland/EPUB
 * Template for epub Creation.
 *
 * @author Giorgio Modoni <g.modoni@alfabook.it>
 */
export declare class Epub3HtmlTemplate {
    staticTemplate: any;
    mediaType: string;
    ext: string;
    sectionTag: string;
    constructor();
    getMimetype(): FileContent;
    getContainer(): FileContent;
    getOpf(prop: BaseInfo, metadataCoverFragment: string, manifestFragment: string, spine: string): {
        name: string;
        folder: string;
        content: string;
    };
    getNav(cssFiles: string, landmarks: string, toc: string): {
        name: string;
        folder: string;
        content: string;
    };
    getNcx(prop: BaseInfo, toc: string): {
        name: string;
        folder: string;
        content: string;
    };
    getContentBody(prop: BaseInfo, body: string, cssFiles: string): {
        name: string;
        folder: string;
        content: string;
    };
    getCover(prop: BaseInfo, css: string): {
        name: string;
        folder: string;
        content: string;
    };
}
