import { BaseInfo } from "../../interfaces/base-info";
import { FileContent } from "../../interfaces/file-content";
export declare class Epub2Template {
    staticTemplate: any;
    mediaType: string;
    ext: string;
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
