import {FileContent} from './interfaces/file-content';
import {BaseInfo} from './interfaces/base-info';
import {CssDef} from './interfaces/css-def';
import {Nav} from './interfaces/nav';
import {Asset} from './interfaces/asset';

import {E3Builder} from './templates/epub3/e3-builder';
import {E2Builder} from './templates/epub2/e2-builder';
import {EhBuilder} from './templates/epub3html/eh-builder';
import {EiBuilder} from './templates/epub3interactive/ei-builder';
import {Utils} from './utils';
import {JsDef} from './interfaces/js-def';
import {MetaDef} from './interfaces/meta-def';
import {BaseBuilder} from './interfaces/base-builder';

/**
 * Prepare data for Template
 *
 * Guide IDPF:
 * Tag structure:
 * https://idpf.github.io/a11y-guidelines/content/semantics/epub-type.html
 *
 * @author Giorgio Modoni <g.modoni@olivettiscuoladigitale.it>
 */
export class BuilderLoader {

    private builder: BaseBuilder;
    private utils: Utils;

    constructor(models) {
        this.utils = new Utils();
        this.getBuilder(models);
    }

    /**
     * Load specific template class
     *
     * @param models - a template name
     */
    public getBuilder(models: string) {
        if (models === 'epub3') {
            this.builder = new E3Builder();
            return;
        }

        if (models === 'epub2') {
            this.builder = new E2Builder();
            return;
        }

        if (models === 'epub3html') {
            this.builder = new EhBuilder();
            return;
        }

        if (models === 'epub3interactive') {
            this.builder = new EiBuilder();
            return;
        }
    }

    /**
     * Get template for mimetype file
     * @returns {FileContent}
     */
    public mimetype(): FileContent {
        return this.builder.getMimetype();
    }

    /**
     * Get container.xml file
     *
     * @returns {FileContent}
     */
    public container(): FileContent {
        return this.builder.getContainer();
    }

    /**
     * Create package file
     * This the most important file!.
     *
     *
     * @param prop - epub properties
     * @param css - css array definition
     * @param assets - assets array definition
     * @returns {{name: string, folder: string, content: string}}
     */
    public opf(chapters: any, prop: BaseInfo, css?: CssDef[], assets?: Asset[]) {
        let metadata: string = this._metadata(prop);
        let manifest: string = this._manifest(chapters, prop, css, assets);
        let spine: string = this._spine(chapters, prop);

        return this.builder.getOpf(prop, metadata, manifest, spine);
    }

    /**
     * Create a hrml/xhtml navigation
     *
     * @param navigation - navigation data object
     * @param css - stylesheet array data
     * @returns {{name: string, folder: string, content: string}}
     */
    public nav(navigation: Nav, css?: CssDef[]) {
        const cssFiles: string = this._cssTags(css);
        const landmarks: string = this._navLandmarks(navigation.landmarks);
        const toc: string = this._navToc(navigation.toc);

        return this.builder.getNav(cssFiles, landmarks, toc);
    }

    /**
     * Generate  ncx file for epub2 and for epub3 compatibility with epub2
     *
     * @param prop -  epub properties
     * @param navigation - navigarion object data
     * @returns {{name: string, folder: string, content: string}}
     */
    public ncx(prop: BaseInfo, navigation: Nav) {
        let toc = this._ncxToc(navigation.toc);

        return this.builder.getNcx(prop, toc);
    }

    /**
     * Generate a chapter content
     *
     * @param prop - epub properties
     * @param body - content string
     * @param css - stylesheet array
     * @returns {{name: string, folder: string, content: string}}
     */
    public contentBody(prop: BaseInfo, body, css?: CssDef[], jss?: JsDef[], metas?: MetaDef[]) {
        let assets = '';
        assets += this._cssTags(css);
        assets += this._jsTags(jss);
        const metadata = this._metaTags(metas);

        return this.builder.getContentBody(prop, body, assets, metadata);
    }

    /**
     * Create a Page for cover.
     * This is optional
     *
     * @param prop - epub properties
     * @param css - stylesheet array
     * @returns {{name: string, folder: string, content: string}}
     */
    public cover(prop: BaseInfo, css?: CssDef[]) {
        let cssFiles = this._cssTags(css);

        return this.builder.getCover(prop, cssFiles);
    }


    public getExt() {
        return this.builder.ext;
    }

    /**
     * Get section tag.
     * This is the tag inside "section" and it's different between html and xhtml epub template
     *
     * @returns {string}
     */
    public getSectionTag(): string {
        return this.builder.sectionTag;
    }

    /**
     * Generate a string of landmark used in opf data
     * @param data - landmarks data
     * @returns {string}
     * @private
     */
    private _navLandmarks(data): string {
        let landmarks: string = '';

        for (let l of data) {
            landmarks += `<li><a epub:type="${this.utils.safeUrl(l.type)}" href="${l.href}">${this.utils.safeHtml(l.type)}</a></li>`;
        }

        return landmarks;
    }

    private _navToc(data) {
        let toc = '';

        for (let t of data) {
            toc += `<li><a href="${this.utils.safeUrl(t.href)}">${this.utils.safeHtml(t.label)}</a></li>`;
        }

        return toc;
    }

    private _ncxToc(data): string {
        let toc: string = '';

        for (let t of data) {
            toc += `<navPoint id="${t.id}">
                     <navLabel>
                        <text>${this.utils.safeHtml(t.label)}</text>
                     </navLabel>
                     <content src="${this.utils.safeUrl(t.href)}"/>
                    </navPoint>`;
        }

        return toc;
    }

    private _cssTags(css?: CssDef[]): string {
        let styleTags: string = '';

        if (css) {
            for (let style of css) {
                let isAlternate = '';
                if (style.type === 'night') isAlternate = 'alternate ';
                styleTags += `<link rel="${isAlternate}stylesheet" type="text/css" 
                    href="${this.utils.safeUrl(style.name)}" class="${style.type}" title="${style.type}"/>`;
            }
        }

        return styleTags;
    }

    private _jsTags(jss?: JsDef[]): string {
        let jsTags: string = '';

        if (jss && Array.isArray(jss)) {
            for (let script of jss) {
                if (script.content) {
                    return jsTags += `<script type="text/javascript">${script.content}</script>`;
                }
                jsTags += `<script type="text/javascript" src="${this.utils.safeUrl(script.path)}"></script>`;
            }
        }

        return jsTags;
    }

    private _metaTags(metas?: MetaDef[]): string {
        let metaTags: string = '';

        if (metas && Array.isArray(metas)) {
            for (let meta of metas) {
                if (meta.name) {
                    return metaTags += `<meta name="${meta.name}" content="${meta.content}"/>`;
                }
            }
        }

        return metaTags;
    }

    private _opfCss(css?: CssDef[]): string {

        let cssFiles = '';
        let cssIdCounter = 0;

        for (let style of css) {
            let cssId = 'css-' + cssIdCounter;
            cssFiles += `<item id="${cssId}" href="${this.utils.safeUrl(style.name)}" media-type="text/css" />`;
            cssIdCounter++;
        }

        return cssFiles;
    }

    private _metadata(prop: BaseInfo): string {

        let metadata: string = '';

        if (prop.cover.file !== '' && prop.cover.asFileName) {
            metadata += `<!-- rights expression for the cover image -->       
                    <link rel="cc:license" refines="#cover-image" href="${prop.cover.license}"/>
                    <link rel="cc:attributionURL" refines="#cover-image" href="${prop.cover.attributionUrl}"/>        
                    <!-- cover meta element included for 2.0 reading system compatibility: -->
                    <meta name="cover" content="cover-image"/>`;
        }

        if (prop.media) {
            if (prop.media.activeClass) {
                metadata += `<meta property="media:active-class">${prop.media.activeClass}</meta>`;
            }
            if (prop.media.duration && Array.isArray(prop.media.duration)) {
                prop.media.duration.forEach((duration) => {
                    metadata += `<meta property="media:duration" refines="${duration.refines}">
                        ${this.utils.safeHtml(duration.value)}</meta>`;
                });
            }
        }

        if (prop.rendition) {
            Object.keys(prop.rendition).forEach((key)=>{
                metadata += `<meta property="rendition:${key}">${prop.rendition[key]}</meta>`;
            });
        }

        return metadata;
    }

    private _manifest(chapters, prop: BaseInfo, css?: CssDef[], assets?: Asset[]): string {

        let manifest: string = '';
        let cssFiles: string = this._opfCss(css);

        manifest += cssFiles;

        if (prop.cover.file !== '' && prop.cover.asFileName) {
            manifest += `<item id="cover-image" href="${prop.cover.asFileName}" media-type="${prop.cover.mediaType}" properties="cover-image" />`;
        }

        for (let page of chapters) {
            manifest += `<item id="${page.id}" href="${page.name}.${this.builder.ext}" media-type="${this.builder.mediaType}" />`;
        }


        manifest += `<item id="nav" href="ebook-nav.${this.builder.ext}" properties="nav" media-type="${this.builder.mediaType}" />
                     <!-- ncx included for 2.0 reading system compatibility: -->
                     <item id="ncx" href="ebook.ncx" media-type="application/x-dtbncx+xml"/>`;

        for (let a of assets) {
            const mediaOverlay = a.mediaOverlay ? `media-overlay="${a.mediaOverlay}"` : '';
            manifest += `<item id="${a.id}" href="${a.name}" media-type="${a.mediaType}" ${mediaOverlay}/>`;
        }

        return manifest;
    }

    private _spine(chapters, prop: BaseInfo) {

        let spine: string = '';

        // if (prop.cover.file !== "" && prop.cover.asFileName)
        //   spine += `<itemref idref="cover" linear="${prop.cover.inline}"/>`;

        for (let page of chapters) {
            spine += `<itemref idref="${page.id}" linear="${page.inline}"/>`;
        }

        return spine;
    }


}