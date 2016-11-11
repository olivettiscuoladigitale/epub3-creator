import {EpubCreator} from "../src/index";


console.log("start demo");

let content = [
    {
        tag: "section", name: "frontmatter", "content": [
        {
            tag: "section", name: "titlepage", "content": [
            {tag: "html", content: "<h1>Libro Autogenerato</h1> 	<div class='aut'>T.S. Eliot</div>"},
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
        {tag: "section", id: "ch1", navLabel: "CAPITOLO 1", content: "sono il contenuto del body"},
        {tag: "section", id: "ch2", navLabel: "CAPITOLO 2", content: "sono il secondo capitolo"}
    ]
    }
];


let epubCreator = new EpubCreator();

epubCreator.template("epub3");
epubCreator.properties.title = "Alfabook book title";
epubCreator.properties.cover.file = "./demo/cover.jpg";
epubCreator.addSections(content);
epubCreator.addCss({
    "content": "@namespace '@charset 'UTF-8'; http://www.w3.org/1999/xhtml'; @namespace epub 'http://www.idpf.org/2007/ops'; body: { margin-left:6em, margin-right:2em}",
    "name": "base.css"
});

// epubCreator.download();

// epubCreator.blobUrl().then( (content) =>console.log(content), (err) => console.log(err));

export function ciccio() {
    alert("ok");
}