import { BaseInfo } from "./interfaces/base-info";
import { CssDef } from "./interfaces/css-def";
/**
 * Create a Epub 3 Compliant Idpf file
 *
 * @autor Giorgio Modoni <g.modoni@alfabook.it>
 */
export declare class EpubCreator {
    private epubZip;
    private utils;
    properties: BaseInfo;
    private templateClass;
    epubContent: string;
    private css;
    private navigation;
    private parser;
    constructor();
    /**
     * Create a default values for epub creation
     */
    setDefaultBaseInfo(): void;
    /**
     * Set specific template for epub creation,
     * default epub3
     *
     * More template can be available in future
     *
     * @param models template model
     */
    template(models?: string): void;
    /**
     * Add mimetype
     */
    mimetype(): void;
    container(): void;
    opf(): void;
    nav(): void;
    ncx(): void;
    content(content: string): void;
    addSections(epubSections: any): void;
    addCss(cssDef: CssDef): Promise<{}>;
    _prepare(): Promise<{}>;
    private _addCover();
    addAsset(data: string, fileName: string): Promise<any>;
    addAssetAsBase64(data: string, fileName: string): Promise<any>;
    addAssetWithPath(path: string, name?: string): Promise<any>;
    addNavLandmarks(data: any): void;
    addNavToc(id: string, label: string): void;
    _addSections(epubSections: any): string;
    blobUrl(): Promise<{}>;
    download(fileName?: string): any;
}
