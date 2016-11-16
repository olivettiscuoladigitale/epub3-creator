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
                        "content": "<p><span xml:lang=\"la\">Nam Sibyllam quidem Cumis ego ipse oculismeis<br />vidi in ampulla pendere, et cum illi pueri dicerent</span>: <br /><span xml:lang=\"grc\">Σίβυλλα τί θέλεις</span>; <span xml:lang=\"la\">respondebat illa</span>: <span xml:lang=\"grc\" >ἀποθανεῖν θέλω</span>.</p>"
                    },
                    {
                        tag: "p",
                        name: "dedication",
                        content: "Dedica del libro: <span xml:lang=\"it\">To typescript the best Js transpiler language</span>"
                    }
                ]
                }
            ]
            },
            {
                tag: "section", name: "bodymatter", "content": [
                {tag: "section", id: "ch1", navLabel: "Chapter 1 - create a epub from html", content: "<h2>Chapter1. Create a Epub from html</h2><div class=\"linegroup\"><div>April is the cruellest month, breeding</div><div>Lilacs out of the dead land, mixing Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur? [33] At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</div></div>"},
                {tag: "section", id: "ch2", navLabel: "Chapter 2", content: "<h2>Chapter2. Lore Ipsum</h2> <div> Tuttavia, perché voi intendiate da dove sia nato tutto questo errore, di quelli che incolpano il piacere ed esaltano il dolore, io spiegherò tutta la questione, e presenterò le idee espresse dal famoso esploratore della verità, vorrei quasi dire dal costruttore della felicità umana. Nessuno, infatti, detesta, odia, o rifugge il piacere in quanto tale, solo perché è piacere, ma perché grandi sofferenze colpiscono quelli che non sono capaci di raggiungere il piacere attraverso la ragione; e al contrario, non c'è nessuno che ami, insegua, voglia raggiungere il dolore in se stesso, soltanto perché è dolore, ma perché qualche volta accadono situazioni tali per cui attraverso la sofferenza o il dolore si cerca di raggiungere un qualche grande piacere. Concentrandoci su casi di piccola importanza: chi di noi intraprende un esercizio ginnico, se non per ottenerne un qualche vantaggio? E d'altra parte, chi avrebbe motivo di criticare colui che desidera provare un piacere cui non segua nessun fastidio, o colui che fugge un dolore che non produce nessun piacere?</div>"}
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
        this.epubCreator = new EpubCreator();

        let prop: any = this.getHtmlProp();
        let cont: any = this.getHtmlContent();

        this.epubCreator.template("epub3");
        this.epubCreator.properties = prop;

        // add css asset content
        this.epubCreator.addCss({
            "content": "@namespace '@charset 'UTF-8'; http://www.w3.org/1999/xhtml'; @namespace epub 'http://www.idpf.org/2007/ops'; body: { margin-left:6em; margin-right:2em; color: black; font-family: times, 'times new roman', serif; background-color: rgb(255,255,245);line-height: 1.5em; } h2 {  margin-top: 5em;  margin-bottom: 2em; } h3 { margin-top: 3em;} .linegroup { margin-top: 1.6em; } span.lnum { float: right; color: gray; font-size : 90%; } a.noteref {     color: rgb(215,215,195);  text-decoration: none; margin-left: 0.5em;   margin-right: 0.5em;} section#rearnotes a {  color: black; text-decoration: none;  border-bottom : 1px dotted gray;  margin-right: 0.8em;} .indent {padding-left: 3em;} .indent2 {padding-left: 5em;} *[epub|type~='dedication'] {padding-left: 2em;} ",
            "name": "base.css"
        });

        this.epubCreator.addSections(cont);

        this.epubCreator.asArrayBuffer().then((content) => {

            setTimeout(() => {
                this.render(content);
            }, 100);

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

        this.Book.renderTo("area").then(() => {
            console.log("ok epub rendered");
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

