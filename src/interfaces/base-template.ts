import {BaseInfo} from './base-info';
import {Utils} from '../utils';

export abstract class BaseTemplate {
    protected utils: Utils;

    constructor() {
        this.utils = new Utils();
    }

    abstract _mimetype(): string;

    abstract _container(): string;

    abstract _opf(prop: BaseInfo, metadata: string, manifest: string, spine: string): string;

    abstract _nav(cssFiles: string, landmarks: string, toc: string): string;

    abstract _ncx(prop: BaseInfo, toc): string;

    abstract _contentBody(prop: BaseInfo, content, assets: string, metadata?: string): string;

    _cover(prop: BaseInfo, cssFiles?: string) {
        return `<div class="body"><img src="${prop.cover.asFileName}" alt="Cover Image" title="Cover Image"/></div>`;
    }
}