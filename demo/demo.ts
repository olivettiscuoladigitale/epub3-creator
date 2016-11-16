import {EpubCreator} from "../src/index";

// let epub = require("./epubjs/epub.min");

let epub = require("../node_modules/epubjs/build/epub.min");


class Demo {

    epubCreator: EpubCreator;
    Book: any;

    constructor() {
        this.epubCreator = new EpubCreator();
        //  this.populateHtmlDefault();
        this.bindEvent();
    }

    bindEvent() {
        // download
        document.getElementById("download").addEventListener("click", () => {
            this.epubCreator.download();
        });

        // load epub
        document.getElementById("showepub").addEventListener("click", () => {
            this.generate();
        });

    }

    getDefaultProperties(): any {
        this.epubCreator.properties.title = "Alfabook book title";
        this.epubCreator.properties.cover.file = "./demo/cover.jpg";

        return this.epubCreator.properties;
    }

    getDefaultContent() {
        return [
            {
                tag: "section", name: "frontmatter", "content": [
                {
                    tag: "section", name: "titlepage", "content": [
                    {tag: "html", content: "<h1>My book title Section</h1> 	<div class='aut'>Author</div>"},
                    {
                        tag: "div",
                        name: "epigraph",
                        content: "<span xml:lang=\"la\">\"Nam Sibyllam quidem Cumis ego ipse oculismeis<br />vidi in ampulla pendere, et cum illi pueri dicerent</span>: <br /> "
                    },
                ]
                }
            ]
            },
            {
                tag: "section", name: "bodymatter", "content": [
                {tag: "section", id: "ch1", navLabel: "Chapter 1", content: "Body content for chapter1"},
                {tag: "section", id: "ch2", navLabel: "Chapter 2", content: "Body content for chapter2"}
            ]
            }
        ];
    };

    populateHtmlDefault() {

        // prop
        let properties = this.getDefaultProperties();
        let inputElement = <HTMLInputElement>document.getElementById("code");
        inputElement.value = JSON.stringify(properties, null, "\t"); // set input element

        // content
        let inputElementC = <HTMLInputElement>document.getElementById("codeContent");
        inputElementC.value = JSON.stringify(this.getDefaultContent(), null, "\t"); // set input element
    }


    getHtmlProp() {
        let inputElement = <HTMLInputElement>document.getElementById("code");

        return JSON.parse(inputElement.value);
    }

    getHtmlContent() {
        let inputElementC = <HTMLInputElement>document.getElementById("codeContent");

        return JSON.parse(inputElementC.value);
    }

    generate() {

        console.log("generate called");

        this.epubCreator = new EpubCreator();

        let prop: any = this.getHtmlProp();
        let cont: any = this.getHtmlContent();


        console.log("content: ", cont);

        this.epubCreator.template("epub3");
        this.epubCreator.properties = prop;

        // add css asset content
        this.epubCreator.addCss({
            "content": "@namespace '@charset 'UTF-8'; http://www.w3.org/1999/xhtml'; @namespace epub 'http://www.idpf.org/2007/ops'; body: { margin-left:6em, margin-right:2em}",
            "name": "base.css"
        });

        this.epubCreator.addSections(cont);

        this.epubCreator.asArrayBuffer().then((content) => {
            this.render(content);
        }, (err) => {
            console.log("Error generating book: ", err);
            alert("error generating book, take a look at your console log");
        });
    }

    render(content: any) {

        if (this.Book) {
            console.log("book destroyed");
            this.Book.destroy();
            this.Book = "";
        }

        this.Book = epub(content, {
            width: 400,
            height: 600,
            spreads: false
        });

        this.Book.renderTo("area").then((result) => {
            console.log("ok render", result);
        }, (err) => {
            console.log("errore", err);
        });


        document.getElementById("prev").addEventListener("click", () => {
            this.Book.prevPage();
        });

        document.getElementById("next").addEventListener("click", () => {
            this.Book.nextPage();
        });


    }

}


let demo = new Demo();
demo.populateHtmlDefault();
demo.generate();


function generate() {
    let x = new Demo();
    x.generate();
}


// bind
document.getElementById("download").addEventListener("click", () => {
    generate();
});

