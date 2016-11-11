import {FileInfo} from  './interfaces/file-info';

/**
 * Utils class
 * group some usefull methods for epub creations
 *
 * @author Giorgio Modoni <g.modoni@alfabook.it>
 */
export class Utils {

    /**
     * Generate a timestamp
     *
     * @returns {number} timestamp
     */
    public getTimeStamp(): number {
        if (!Date.now)
            Date.now = () => new Date().getTime();

        return Math.floor(Date.now() / 1000)
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

        return {
            fullName: fileName,
            name: name,
            extension: extension
        };
    }


}