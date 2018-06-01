import {BaseTemplate} from './base-template';
import {BaseInfo} from './base-info';
import {FileContent} from './file-content';
import {EpubFiles} from './epub-files';

export abstract class BaseBuilder {
    template: BaseTemplate;
    ext: string = 'xhtml';
    mediaType: string = 'application/xhtml+xml';
    sectionTag: string = 'epub:type';
    fileNames: EpubFiles = {
        cover: 'cover.xhtml',
        opf: 'ebook.opf',
        nav: 'ebook-nav.xhtml',
        ncx: 'ebook.ncx',
        container: 'container.xml',
        content: 'ebook-content.xhtml'
    };

    public getMimetype(): FileContent {
        let content: string = this.template._mimetype();

        return {
            name: 'mimetype',
            folder: '',
            content: content
        };
    }

    public getContainer(): FileContent {
        let content: string = this.template._container();

        return {
            name: this.fileNames.container,
            folder: 'META-INF',
            content: content
        };
    }

    public getOpf(prop: BaseInfo, metadataCoverFragment: string, manifestFragment: string, spine: string) {
        let content: string = this.template._opf(prop, metadataCoverFragment, manifestFragment, spine);

        return {
            name: this.fileNames.opf,
            folder: 'EPUB',
            content: content
        };
    }

    public getNav(cssFiles: string, landmarks: string, toc: string) {
        let content: string = this.template._nav(cssFiles, landmarks, toc);

        return {
            name: this.fileNames.nav,
            folder: 'EPUB',
            content: content
        };
    }

    public getNcx(prop: BaseInfo, toc: string) {
        let content: string = this.template._ncx(prop, toc);

        return {
            name: this.fileNames.ncx,
            folder: 'EPUB',
            content: content
        };
    }

    public getContentBody(prop: BaseInfo, body: string, cssFiles: string) {
        let content: string = this.template._contentBody(prop, body, cssFiles);

        return {
            name: this.fileNames.content,
            folder: 'EPUB',
            content: content
        };
    }

    public getCover(prop: BaseInfo, css: string) {
        let content: string = this.template._cover(prop, css);

        return {
            name: this.fileNames.cover,
            folder: 'EPUB',
            content: content
        };
    }
}