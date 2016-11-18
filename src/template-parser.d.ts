import { FileContent } from "./interfaces/file-content";
import { BaseInfo } from "./interfaces/base-info";
import { CssDef } from "./interfaces/css-def";
import { Nav } from "./interfaces/nav";
import { Assets } from "./interfaces/assets";
/**
 * Prepare data for Template
 *
 * @author Giorgio Modoni <g.modoni@alfabook.it>
 */
export declare class TemplateParser {
    private templateClass;
    constructor(models: any);
    template(models: string): void;
    mimetype(): FileContent;
    container(): FileContent;
    opf(prop: BaseInfo, css?: CssDef[], assets?: Assets[]): any;
    nav(navigation: Nav, css?: CssDef[]): any;
    ncx(prop: BaseInfo, navigation: Nav): any;
    contentBody(prop: BaseInfo, body: any, css?: CssDef[]): any;
    cover(prop: BaseInfo, css?: CssDef[]): any;
    private _navLandmarks(data);
    private _navToc(data);
    private _ncxToc(data);
    private _cssLink(css?);
    private _opfCss(css?);
    private _metadata(prop);
    private _manifest(prop, css?, assets?);
    private _spine(prop);
}
