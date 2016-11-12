import { BaseInfo } from "../../interfaces/base-info";
export declare class Epub3Template {
    _mimetype(): string;
    _container(): string;
    _opf(prop: BaseInfo, metadataCoverFragment: string, manifestFragment: string): string;
    _nav(cssFiles: string, landmarks: string, toc: string): string;
    _ncx(prop: BaseInfo, toc: any): string;
    _contentBody(prop: BaseInfo, content: any, cssFiles: any): string;
}
