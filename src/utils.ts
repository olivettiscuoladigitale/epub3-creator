import {FileInfo} from './interfaces/file-info';

/**
 * Utils class
 * group some usefull methods for epub creations
 *
 * @author Giorgio Modoni <g.modoni@olivettiscuoladigitale.it>
 */
export class Utils {
    tagsToReplace: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    };

    /**
     * Generate a timestamp
     *
     * @returns {number} timestamp
     */
    public getTimeStamp(): number {
        if (!Date.now)
            Date.now = () => new Date().getTime();

        return Math.floor(Date.now() / 1000);
    }

    /**
     * Generate a unique name for epub
     *
     * @returns {string} fileName
     */
    public generateName(): string {
        let fileName: string;
        fileName = this.getTimeStamp() + '.epub';

        return fileName;
    }


    public getFileNameFromPath(fullPath: string): FileInfo {

        const fileName: string = fullPath.replace(/^.*[\\\/]/, '');
        const extension: string = fileName.substr(fileName.lastIndexOf('.') + 1);
        const name: string = fileName.substr(0, fileName.length - extension.length - 1);
        const path: string = fullPath.replace(fileName, '');

        return {
            fullName: fileName,
            name: name,
            extension: extension,
            path: path
        };
    }

    /**
     * Sanitize html entities for content
     *
     * @param {string} str
     * @returns {string}
     */
    public safeHtml(str: string): string {
        return str.replace(/[&<>]/g, this.replaceTag);
    }

    /**
     * Sanitize url
     * @param {string} str
     * @returns {string}
     */
    public safeUrl(str: string): string {
        return encodeURI(str);
    }


    private replaceTag(tag) {
        return this.tagsToReplace[tag] || tag;
    }

}