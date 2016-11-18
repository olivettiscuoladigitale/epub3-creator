import {FileContent} from "./interfaces/file-content";
import {BaseInfo} from "./interfaces/base-info";
import {CssDef} from "./interfaces/css-def";
import {Nav} from "./interfaces/nav";
import {Assets} from "./interfaces/assets";

import {Epub3Template} from "./templates/epub3/epub3-template";
import {Epub2Template} from "./templates/epub2/epub2-templates";
import {Epub3HtmlTemplate} from "./templates/epub3html/epub3html-template";

/**
 * Prepare data for Template
 *
 * @author Giorgio Modoni <g.modoni@alfabook.it>
 */
export class TemplateParser {

    private templateClass: any;

    constructor(models) {
        this.template(models);
    }

    public template(models: string) {

        if (models === "epub3")
            this.templateClass = new Epub3Template();

        if (models === "epub2")
            this.templateClass = new Epub2Template();

        if (models === "epub3html")
            this.templateClass = new Epub3HtmlTemplate();
    }

    public mimetype(): FileContent {
        return this.templateClass.getMimetype();
    }

    public container(): FileContent {
        return this.templateClass.getContainer();
    }

    public opf(prop: BaseInfo, css?: CssDef[], assets?: Assets[]) {
        let metadata: string = this._metadata(prop);
        let manifest: string = this._manifest(prop, css, assets);
        let spine: string = this._spine(prop);

        return this.templateClass.getOpf(prop, metadata, manifest, spine);
    }

    public nav(navigation: Nav, css?: CssDef[]) {
        const cssFiles: string = this._cssLink(css);
        const landmarks: string = this._navLandmarks(navigation.landmarks);
        const toc: string = this._navToc(navigation.toc);

        return this.templateClass.getNav(cssFiles, landmarks, toc);
    }

    public ncx(prop: BaseInfo, navigation: Nav) {
        let toc = this._ncxToc(navigation.toc);

        return this.templateClass.getNcx(prop, toc);
    }

    public contentBody(prop: BaseInfo, body, css?: CssDef[]) {
        let cssFiles = this._cssLink(css);

        return this.templateClass.getContentBody(prop, body, cssFiles);
    }

    public cover(prop: BaseInfo, css?: CssDef[]) {
        let cssFiles = this._cssLink(css);

        return this.templateClass.getCover(prop, cssFiles);
    }

    private _navLandmarks(data) {
        let landmarks: string = "";

        for (let l of data) {
            landmarks += `<li><a epub:type="${l.type}" href="${l.href}" >${l.type}</a></li>`;
        }

        return landmarks;
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
        let cssIdCounter = 0;

        for (let style of css) {
            let cssId = "css-" + cssIdCounter;
            cssFiles += `<item id="${cssId}" href="${style.name}" media-type="text/css" />`;
            cssIdCounter++;
        }

        return cssFiles;
    }

    private _metadata(prop: BaseInfo): string {

        let metadata: string = "";

        if (prop.cover.file !== "" && prop.cover.asFileName) {
            metadata += `<!-- rights expression for the cover image -->       
                    <link rel="cc:license" refines="#cover-image" href="${prop.cover.license}" />
                    <link rel="cc:attributionURL" refines="#cover-image" href="${prop.cover.attributionUrl}" />        
                    <!-- cover meta element included for 2.0 reading system compatibility: -->
                    <meta name="cover" content="cover-image"/>`;
        }

        return metadata;
    }


    private _manifest(prop: BaseInfo, css?: CssDef[], assets?: Assets[]): string {

        let manifest: string = "";
        let cssFiles: string = this._opfCss(css);

        if (prop.cover.file !== "" && prop.cover.asFileName) {
            manifest += `<item id="cover-image" href="${prop.cover.asFileName}" media-type="${prop.cover.mediaType}" properties="cover-image" />
                         <item id="cover" href="cover.${this.templateClass.ext}" media-type="${this.templateClass.mediaType}"/>
                        `;
        }

        manifest += cssFiles;

        manifest += `<item id="t1" href="ebook-content.${this.templateClass.ext}" media-type="${this.templateClass.mediaType}" />
                     <item id="nav" href="ebook-nav.${this.templateClass.ext}" properties="nav" media-type="${this.templateClass.mediaType}" />
                     <!-- ncx included for 2.0 reading system compatibility: -->
                     <item id="ncx" href="ebook.ncx" media-type="application/x-dtbncx+xml" />
                    `;

        for (let a of assets) {
            manifest += `<item id="${a.id}" href="${a.name}" media-type="${a.mediaType}"/>`;
        }

        return manifest;
    }

    private _spine(prop: BaseInfo) {

        let spine: string = "";

        if (prop.cover.file !== "" && prop.cover.asFileName) {
            spine += `<itemref idref="cover" linear="${prop.cover.inline}"/>`;
        }

        return spine;
    }


}