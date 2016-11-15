import { BaseInfo } from "../../interfaces/base-info";
/**
 * This is a template for epub3 based on: https://github.com/IDPF/epub3-samples/tree/master/30/wasteland/EPUB
 * Template for epub Creation.
 *
 * @author Giorgio Modoni <g.modoni@alfabook.it>
 */
export declare class Epub3Template {
    _mimetype(): string;
    _container(): string;
    _opf(prop: BaseInfo, metadataCoverFragment: string, manifestFragment: string): string;
    _nav(cssFiles: string, landmarks: string, toc: string): string;
    _ncx(prop: BaseInfo, toc: any): string;
    _contentBody(prop: BaseInfo, content: any, cssFiles: any): string;
}
