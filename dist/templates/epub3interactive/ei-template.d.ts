import { BaseInfo } from '../../interfaces/base-info';
import { BaseTemplate } from '../../interfaces/base-template';
/**
 * Static file template.
 * Leave this class without code.
 *
 * @author Marco Bergantin <m.bergantin@olivettiscuoladigitale.it>
 */
export declare class EiTemplate extends BaseTemplate {
    _mimetype(): string;
    _container(): string;
    _opf(prop: BaseInfo, metadata: string, manifest: string, spine: string): string;
    _nav(cssFiles: string, landmarks: string, toc: string): string;
    _ncx(prop: BaseInfo, toc: any): string;
    _contentBody(prop: BaseInfo, content: any, assets: string, metadata?: string): string;
}
