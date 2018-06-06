import { BaseInfo } from './base-info';
import { Utils } from '../utils';
export declare abstract class BaseTemplate {
    protected utils: Utils;
    constructor();
    abstract _mimetype(): string;
    abstract _container(): string;
    abstract _opf(prop: BaseInfo, metadata: string, manifest: string, spine: string): string;
    abstract _nav(cssFiles: string, landmarks: string, toc: string): string;
    abstract _ncx(prop: BaseInfo, toc: any): string;
    abstract _contentBody(prop: BaseInfo, content: any, assets: string, metadata?: string): string;
    _cover(prop: BaseInfo, cssFiles?: string): string;
}
