import {Utils} from './utils';


export class Sections {

    private utils: Utils;

    constructor() {
        this.utils = new Utils(); // load utils class
    }

    addSections(epubSections:any): string {

        var sectionAsText = "";
        var progressiveId = 0;

        for (let data of epubSections) {

            let id = data.id ? data.id : data.name + "_" + progressiveId;
            let content: string = "";

            if (Array.isArray(data.content))
                content = this.addSections(data.content);
            else
                content = data.content;


            if (data.tag && data.tag != "html") {

                sectionAsText += `
                    <${data.tag} epub:type="${data.name}" id="${id}">
                        ${content}
                    </${data.tag}>`;
            } else {
                sectionAsText += content;
            }

            progressiveId++;
        }

        return sectionAsText;
    }


}

