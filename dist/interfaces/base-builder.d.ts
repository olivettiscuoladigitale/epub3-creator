import { BaseTemplate } from './base-template';
import { BaseInfo } from './base-info';
import { FileContent } from './file-content';
import { EpubFiles } from './epub-files';
export declare abstract class BaseBuilder {
    template: BaseTemplate;
    ext: string;
    mediaType: string;
    sectionTag: string;
    fileNames: EpubFiles;
    getMimetype(): FileContent;
    getContainer(): FileContent;
    getOpf(prop: BaseInfo, metadataFragment: string, manifestFragment: string, spineFragment: string): {
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
    getContentBody(prop: BaseInfo, body: string, assets: string, metadata?: string): {
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
