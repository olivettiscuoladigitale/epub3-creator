import {BaseInfo} from './base-info';

export abstract class BaseTemplate {
    abstract _mimetype(): string;
    abstract _container(): string;
    abstract _opf(prop: BaseInfo, metadata: string, manifest: string, spine: string): string;
    abstract _nav(cssFiles: string, landmarks: string, toc: string): string;
    abstract _ncx(prop: BaseInfo, toc): string;
    abstract _contentBody(prop: BaseInfo, content, cssFiles: string): string;
    abstract _cover(prop: BaseInfo, cssFiles: string);
}