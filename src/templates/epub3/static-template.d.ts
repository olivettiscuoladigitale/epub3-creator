import { BaseInfo } from "../../interfaces/base-info";
/**
 * Static file template.
 * Leave this class without code.
 *
 * @author Giorgio Modoni <g.modoni@alfabook.it>
 */
export declare class StaticTemplate {
    _mimetype(): string;
    _container(): string;
    _opf(prop: BaseInfo, metadata: string, manifest: string, spine: string): string;
    _nav(cssFiles: string, landmarks: string, toc: string): string;
    _ncx(prop: BaseInfo, toc: any): string;
    _contentBody(prop: BaseInfo, content: any, cssFiles: string): string;
    _cover(prop: BaseInfo, cssFiles: string): string;
}
