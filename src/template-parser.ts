import {FileContent} from "./interfaces/file-content";
import {BaseInfo} from "./interfaces/base-info";
import {CssDef} from "./interfaces/css-def";
import {Nav} from "./interfaces/nav";

import {Epub3Template} from "./templates/epub3/epub3";


export class TemplateParser {

    private templateClass: any;

    constructor(models) {
        this.template(models);
    }


    public template(models?: string) {
        if (!models || models === "epub3")
            this.templateClass = new Epub3Template();
    }


    public mimetype(): FileContent {
        let content: string = this.templateClass._mimetype();
        return {
            name: "mimetype",
            folder: "",
            content: content
        };
    }

    public container(): FileContent {
        let content: string = this.templateClass._container();
        return {
            name: "container.xml",
            folder: "META-INF",
            content: content
        };
    }

    public opf(prop: BaseInfo, css?: CssDef[]) {

        let metadataCoverFragment: string = "";
        let manifestFragment: string = "";
        let manifestCoverImage: string = "";
        let cssFiles = this._opfCss(css);


        if (prop.cover.file !== "" && prop.cover.asFileName) {
            metadataCoverFragment = `<!-- rights expression for the cover image -->       
                    <link rel="cc:license" refines="#cover" href="${prop.cover.license}" />
                    <link rel="cc:attributionURL" refines="#cover" href="${prop.cover.attributionUrl}" />        
                    <!-- cover meta element included for 2.0 reading system compatibility: -->
                    <meta name="cover" content="cover"/>`;

            manifestCoverImage = `<item id="cover" href="${prop.cover.asFileName}" media-type="${prop.cover.mediaType}" properties="cover-image" />`;
        }

        manifestFragment += manifestCoverImage;
        manifestFragment += `<item id="t1" href="ebook-content.xhtml" media-type="application/xhtml+xml" />`;
        manifestFragment += `<item id="nav" href="ebook-nav.xhtml" properties="nav" media-type="application/xhtml+xml" />`;
        manifestFragment += `<!-- ncx included for 2.0 reading system compatibility: -->
                            <item id="ncx" href="ebook.ncx" media-type="application/x-dtbncx+xml" />`;

        manifestFragment += cssFiles;


        let content: string = this.templateClass._opf(prop, metadataCoverFragment, manifestFragment);
        return {
            name: "ebook.opf",
            folder: "EPUB",
            content: content
        };
    }


    public nav(navigation: Nav, css?: CssDef[]) {

        const cssFiles: string = this._cssLink(css);
        const landmarks: string = this._navLandmarks(navigation.landmarks);
        const toc: string = this._navToc(navigation.toc);

        let content: string = this.templateClass._nav(cssFiles, landmarks, toc);
        return {
            name: "ebook-nav.xhtml",
            folder: "EPUB",
            content: content
        };
    }

    private _navLandmarks(data) {
        let landmarks: string = "";

        for (let l of data) {
            landmarks += `<li><a epub:type="${l.type}" href="${l.href}" >${l.type}</a></li>`;
        }

        return landmarks;
    }

    public ncx(prop: BaseInfo, navigation: Nav) {

        let toc = this._ncxToc(navigation.toc);

        let content: string = this.templateClass._ncx(prop, toc);
        return {
            name: "ebook.ncx",
            folder: "EPUB",
            content: content
        };
    }

    public contentBody(prop: BaseInfo, body, css?: CssDef[]) {

        let cssFiles = this._cssLink(css);

        let content: string = this.templateClass._contentBody(prop, body, cssFiles);
        return {
            name: "ebook-content.xhtml",
            folder: "EPUB",
            content: content
        };
    }

    private _navToc(data) {
        let toc = "";

        for (let t of data) {
            toc += `<li><a href="${t.href}">${t.label}</a></li>`;
        }

        return toc;
    }

    private  _ncxToc(data): string {
        let toc: string = "";

        for (let t of data) {
            toc += `<navPoint id="${t.id}">
                     <navLabel>
                        <text>${t.label}</text>
                     </navLabel>
                     <content src="${t.href}"/>
                    </navPoint>`;
        }

        return toc;
    }

    private _cssLink(css?: CssDef[]): string {
        let cssFiles: string = "";

        if (css) {
            for (let style of css) {
                let isAlternate = "";
                if (style.type === "night") isAlternate = "alternate ";
                cssFiles += `<link rel="${isAlternate}stylesheet" type="text/css" href="${style.name}" class="${style.type}" title="${style.type}"/> `;
            }
        }

        return cssFiles;
    }

    private  _opfCss(css?: CssDef[]): string {

        let cssFiles = "";

        if (css) {
            let cssIdCounter = 0;
            for (let style of css) {
                let cssId = "css-" + cssIdCounter;
                cssFiles += `<item id="${cssId}" href="${style.name}" media-type="text/css" /> `;
                cssIdCounter++;
            }
        }

        return cssFiles;
    }
}