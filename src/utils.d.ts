import { FileInfo } from './interfaces/file-info';
/**
 * Utils class
 * group some usefull methods for epub creations
 *
 * @author Giorgio Modoni <g.modoni@alfabook.it>
 */
export declare class Utils {
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
}
