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
    template(models?: string): void;
    mimetype(): FileContent;
    container(): FileContent;
    opf(prop: BaseInfo, css?: CssDef[], assets?: Assets[]): {
        name: string;
        folder: string;
        content: string;
    };
    nav(navigation: Nav, css?: CssDef[]): {
        name: string;
        folder: string;
        content: string;
    };
    private _navLandmarks(data);
    ncx(prop: BaseInfo, navigation: Nav): {
        name: string;
        folder: string;
        content: string;
    };
    contentBody(prop: BaseInfo, body: any, css?: CssDef[]): {
        name: string;
        folder: string;
        content: string;
    };
    private _navToc(data);
    private _ncxToc(data);
    private _cssLink(css?);
    private _opfCss(css?);
}
