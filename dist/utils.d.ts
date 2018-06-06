import { FileInfo } from './interfaces/file-info';
/**
 * Utils class
 * group some usefull methods for epub creations
 *
 * @author Giorgio Modoni <g.modoni@olivettiscuoladigitale.it>
 */
export declare class Utils {
    tagsToReplace: {
        [key: string]: string;
    };
    /**
     * Generate a timestamp
     *
     * @returns {number} timestamp
     */
    getTimeStamp(): number;
    /**
     * Generate a unique name for epub
     *
     * @returns {string} fileName
     */
    generateName(): string;
    getFileNameFromPath(fullPath: string): FileInfo;
    /**
     * Sanitize html entities for content
     *
     * @param {string} str
     * @returns {string}
     */
    safeHtml(str: string): string;
    /**
     * Sanitize url
     * @param {string} str
     * @returns {string}
     */
    safeUrl(str: string): string;
    private replaceTag;
}
