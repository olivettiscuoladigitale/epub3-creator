import {EpubCreator} from "../src/index";
import * as jQuery from "jquery";

let epub = require("./epubjs/epub.min");

let content: any = [
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

console.log("This is the es6 test demo");

let epubCreator = new EpubCreator();
epubCreator.template("epub3");
epubCreator.properties.title = "Alfabook book title";
epubCreator.properties.cover.file = "./demo/cover.jpg";
epubCreator.addSections(content);
epubCreator.addCss({
    "content": "@namespace '@charset 'UTF-8'; http://www.w3.org/1999/xhtml'; @namespace epub 'http://www.idpf.org/2007/ops'; body: { margin-left:6em, margin-right:2em}",
    "name": "base.css"
});

document.getElementById("download").addEventListener("click", () => { epubCreator.download(); } ); // download
document.getElementById("showepub").addEventListener("click", ()  => { epubjsStart(); }); // load epub

let inputElement = <HTMLInputElement>document.getElementById("code");
inputElement.value = JSON.stringify(content,  null, "\t"); // set input element


function epubjsStart() {

    epubCreator.asArrayBuffer().then((content) => {

            let Book = epub(content, {
                width: 400,
                height: 600,
                spreads: false
            });

            Book.renderTo("area").then(function () {
                // Book.setStyle("width", "400px");
            });

            jQuery("#prev").click(() => {
                Book.prevPage();
                console.log("prev page");
            });

            jQuery("#next").click(() => {
                Book.nextPage();
                console.log("next page");
            });


        }, (err) => console.log(err)
    );
}


epubjsStart();