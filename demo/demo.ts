import {EpubCreator} from '../src/index';

const epub = require('../node_modules/epubjs/build/epub');
const updateEvent = new Event('updated');

class Demo {

    epubCreator: EpubCreator;
    Book: any;

    constructor() {
        this.epubCreator = new EpubCreator('epub3interactive');
        this.populateInteractiveDefault();
        this.bindEvent();
    }

    bindEvent() {
        // download
        document.getElementById('download').addEventListener('click', () => {
            this.epubCreator.download();
        });

        // load epub
        document.getElementById('showepub').addEventListener('click', () => {
            let e = <HTMLSelectElement> document.getElementById('template');
            let t: any = e.options[e.selectedIndex];
            let template: string = t.value;

            console.log('TEMPLATE SELECTED: ', template);

            this.generate(template);
        });

        // load defaults
        document.getElementById('setdefaults').addEventListener('click', () => {
            const e = <HTMLSelectElement> document.getElementById('template');
            const t: any = e.options[e.selectedIndex];
            const template: string = t.value;

            console.log('TEMPLATE SELECTED: ', template);

            if (template === 'epub3interactive') {
                this.epubCreator = new EpubCreator();
                this.epubCreator.template(template);
                this.populateInteractiveDefault();
            } else {
                this.populateHtmlDefault();
            }

            this.generate(template);
        });

    }

    getDefaultProperties(): any {
        this.epubCreator.properties.title = 'Olivetti Scuola Digitale book title';
        this.epubCreator.properties.cover.file = '/demo/cover.png';

        return this.epubCreator.properties;
    }

    getDefaultInteractiveProperties(): any {
        this.getDefaultProperties();
        this.epubCreator.properties.rendition = {
            layout: 'pre-paginated',
            orientation: 'portrait',
            spread: 'none'
        };

        return this.epubCreator.properties;
    }

    getDefaultContent() {
        return [
            {
                tag: 'section', name: 'frontmatter', 'content': [
                    {
                        tag: 'section', name: 'titlepage', 'content': [
                            {
                                tag: 'html',
                                content: '<h1>My book title Section</h1> 	<div class=\'aut\'>Author</div>'
                            },
                            {
                                tag: 'div',
                                name: 'epigraph',
                                'content': '<p><span xml:lang="la">Nam Sibyllam quidem Cumis ego ipse oculismeis<br />vidi in ampulla pendere, et cum illi pueri dicerent</span>: <br /><span xml:lang="grc">Σίβυλλα τί θέλεις</span>; <span xml:lang="la">respondebat illa</span>: <span xml:lang="grc" >ἀποθανεῖν θέλω</span>.</p>'
                            },
                            {
                                tag: 'p',
                                name: 'dedication',
                                content: 'Dedica del libro: <span xml:lang="it">To typescript the best Js transpiler language</span>'
                            }
                        ]
                    }
                ]
            },
            {
                tag: 'section', name: 'bodymatter', 'content': [
                    {
                        tag: 'section',
                        id: 'ch1',
                        navLabel: 'Chapter 1 - create a epub from html',
                        content: '<h2>Chapter1. Create a Epub from html</h2><div class="linegroup"><div>April is the cruellest month, breeding</div><div>Lilacs out of the dead land, mixing Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur? [33] At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</div></div>'
                    },
                    {
                        tag: 'section',
                        id: 'ch2',
                        navLabel: 'Chapter 2',
                        content: '<h2>Chapter2. Lore Ipsum</h2> <div> Tuttavia, perché voi intendiate da dove sia nato tutto questo errore, di quelli che incolpano il piacere ed esaltano il dolore, io spiegherò tutta la questione, e presenterò le idee espresse dal famoso esploratore della verità, vorrei quasi dire dal costruttore della felicità umana. Nessuno, infatti, detesta, odia, o rifugge il piacere in quanto tale, solo perché è piacere, ma perché grandi sofferenze colpiscono quelli che non sono capaci di raggiungere il piacere attraverso la ragione; e al contrario, non c\'è nessuno che ami, insegua, voglia raggiungere il dolore in se stesso, soltanto perché è dolore, ma perché qualche volta accadono situazioni tali per cui attraverso la sofferenza o il dolore si cerca di raggiungere un qualche grande piacere. Concentrandoci su casi di piccola importanza: chi di noi intraprende un esercizio ginnico, se non per ottenerne un qualche vantaggio? E d\'altra parte, chi avrebbe motivo di criticare colui che desidera provare un piacere cui non segua nessun fastidio, o colui che fugge un dolore che non produce nessun piacere?</div>'
                    }
                ]
            }
        ];
    };

    getInteractiveContent() {
        return `
  <div class="remodal" data-remodal-id="SCDefaultAlert" role="dialog" aria-labelledby="SCDefaultAlertTitle" aria-describedby="SCDefaultAlertMsg">
    <button data-remodal-action="close" class="remodal-close" aria-label="Close"/>
    <div>
      <h2 id="SCDefaultAlertTitle">Remodal</h2>
      <p id="SCDefaultAlertMsg">
        Responsive, lightweight, fast, synchronized with CSS animations, fully customizable modal window plugin with declarative
        state notation and hash tracking.
      </p>
    </div>
    <br/>
    <button data-remodal-action="confirm" class="remodal-confirm">OK</button>
  </div>

  <div class="SCPage SCPage4" dir="ltr">
    <div id="SCAnchors">

      <a id="obj31" href="../5/page.xhtml" data-src="" data-chunk="5">anchor</a>
      <a id="obj32" href="../3/page.xhtml" data-src="" data-chunk="3">anchor</a>
      <a id="obj33" href="../3/page.xhtml" data-src="" data-chunk="3">anchor</a>
      <a id="obj34" href="../2/page.xhtml" data-src="" data-chunk="2">anchor</a>
    </div>
    <!-- OVERLAY: START -->
    <div class="SCOverlay SCOverlay4">

      <div id="obj4171" class="SCPageObject SCRectangle"/>
      <div id="obj3657" class="SCPageObject SCGestureRecognizer"/>
      <div id="obj3659" class="SCPageObject SCGestureRecognizer"/>
      <div id="obj3666" class="SCPageObject SCGestureRecognizer"/>
      <div id="obj3874" class="SCPageObject SCActionListContainer"/>
      <div id="obj4504" class="SCPageObject SCActionListContainer"/>
      <div id="obj4511" class="SCPageObject SCActionListContainer"/>
    </div>
    <!-- OVERLAY: END -->

    <div class="SCContent">
      <!-- PAGE OBJECTS: START -->

      <div id="obj5309" class="SCPageObject SCActionListContainer"/>
      <div id="obj5349" class="SCPageObject SCGestureRecognizer"/>
     

      <div id="obj5305" class="SCPageObject SCText aloud">
        <div id="obj5305_content" class="SCTextContainer SCTextVAlignTop">
          <p>
            <span style="font-size: 50px; font-family: helvetica;">
              <span id="obj1872" class="SCReadaloudBlock">Sono Camillo</span>
            </span>
          </p>
          <p>
            <span style="font-size: 50px; font-family: helvetica;">
              <span id="obj1874" class="SCReadaloudBlock">eccomi qua,</span>
            </span>
          </p>
          <p>
            <span style="font-size: 50px; font-family: helvetica;">
              <span id="obj1876" class="SCReadaloudBlock">pronto a giocare</span>
            </span>
          </p>
          <p>
            <span style="font-size: 50px; font-family: helvetica;">
              <span id="obj1878" class="SCReadaloudBlock">con il mio caro pap&#xE0;...</span>
            </span>
          </p>
        </div>
      </div>
      <div id="obj5387" class="SCPageObject SCText testo">
        <div id="obj5387_content" class="SCTextContainer SCTextVAlignTop">
          <p>
            <span style="font-size: 60px; font-family: arial, helvetica, sans-serif;">...</span>
          </p>
        </div>
      </div>

      <!-- PAGE OBJECTS: END -->
      <!-- CUSTOM CONTENT: START -->

      <!-- CUSTOM CONTENT: END -->
    </div>
    <div id="SCFirstFakeReadAloudDiv">
      <span id="SCFirstFakeReadAloud"/>
    </div>
  </div>`;
    }

    populateHtmlDefault() {
        // prop
        let properties = this.getDefaultProperties();
        let inputElement = <HTMLInputElement>document.getElementById('code');
        inputElement.value = JSON.stringify(properties, null, '\t'); // set input element
        inputElement.dispatchEvent(updateEvent);

        // content
        let inputElementC = <HTMLInputElement>document.getElementById('codeContent');
        inputElementC.value = JSON.stringify(this.getDefaultContent(), null, '\t'); // set input element
        inputElementC.dispatchEvent(updateEvent);
    }

    populateInteractiveDefault() {
        // prop
        const properties = this.getDefaultInteractiveProperties();
        const inputElement = <HTMLInputElement>document.getElementById('code');
        inputElement.value = JSON.stringify(properties, null, '\t'); // set input element
        inputElement.dispatchEvent(updateEvent);

        // content
        const inputElementC = <HTMLInputElement>document.getElementById('codeContent');
        inputElementC.value = JSON.stringify(this.getInteractiveContent(), null, '\t'); // set input element
        inputElementC.dispatchEvent(updateEvent);
    }


    getHtmlProp() {
        let inputElement = <HTMLInputElement>document.getElementById('code');

        return JSON.parse(inputElement.value);
    }

    getHtmlContent() {
        let inputElementC = <HTMLInputElement>document.getElementById('codeContent');

        return JSON.parse(inputElementC.value);
    }

    updateTemplateText(tx: string) {
        document.getElementById('templateText').innerHTML = tx;
    }

    generate(template: string = 'epub3interactive') {

        this.updateTemplateText(template);

        let prop: any = this.getHtmlProp();
        let cont: any = this.getHtmlContent();

        this.epubCreator.properties = prop;

        // add css asset content
        this.epubCreator.addCss({
            'content': '@namespace \'@charset \'UTF-8\'; http://www.w3.org/1999/xhtml\'; @namespace epub \'http://www.idpf.org/2007/ops\'; body: { margin-left:6em; margin-right:2em; color: black; font-family: times, \'times new roman\', serif; background-color: rgb(255,255,245);line-height: 1.5em; } h2 {  margin-top: 5em;  margin-bottom: 2em; } h3 { margin-top: 3em;} .linegroup { margin-top: 1.6em; } span.lnum { float: right; color: gray; font-size : 90%; } a.noteref {     color: rgb(215,215,195);  text-decoration: none; margin-left: 0.5em;   margin-right: 0.5em;} section#rearnotes a {  color: black; text-decoration: none;  border-bottom : 1px dotted gray;  margin-right: 0.8em;} .indent {padding-left: 3em;} .indent2 {padding-left: 5em;} *[epub|type~=\'dedication\'] {padding-left: 2em;} ',
            'name': 'base.css'
        });

        if (template === 'epub3interactive') {
            this.epubCreator.addChapter({name: 'ebook-content', content: cont});
        } else {
            this.epubCreator.addChapter({name: 'ebook-content', content: ''});
            this.epubCreator.addSections(cont, 'ebook-content');
        }

        this.epubCreator.addAsset({
            'content': '/9j/4AAQSkZJRgABAgAAZABkAAD/7AARRHVja3kAAQAEAAAACgAA/+EDKmh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1MUVGRUQ3QUE0RjUxMUU2QTUyNEYzQkVBQ0RDRkU0RCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1MUVGRUQ3OUE0RjUxMUU2QTUyNEYzQkVBQ0RDRkU0RCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgTWFjaW50b3NoIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTRGREJEMTVBMjk3MTFFNkE0MTlCQ0YwRjVGNDJENTAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTRGREJEMTZBMjk3MTFFNkE0MTlCQ0YwRjVGNDJENTAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAUEBAZEhknFxcnMiYfJjIuJiYmJi4+NTU1NTU+REFBQUFBQUREREREREREREREREREREREREREREREREREREREARUZGSAcICYYGCY2JiAmNkQ2Kys2REREQjVCRERERERERERERERERERERERERERERERERERERERERERERERERET/wAARCAAeAB4DASIAAhEBAxEB/8QATQABAQAAAAAAAAAAAAAAAAAAAAUBAQEBAAAAAAAAAAAAAAAAAAADBRABAAAAAAAAAAAAAAAAAAAAABEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AhgNJAAAAAAB//9k=',
            mediaType: 'image/jpg', name: 'link/images/cover800.jpg', base64: true
        });


        this.epubCreator.asArrayBuffer().then((content) => {

            setTimeout(() => {
                this.render(content);
            }, 100);

        }, (err) => {
            console.log('Error generating book: ', err);
            alert('error generating book, take a look at your console log');
        });
    }

    render(content: any) {

        if (this.Book) {
            console.log('book destroyed');

            try {
                this.Book.destroy();
            } catch (e) {
                console.log(e);
            }
            this.Book = '';
        }

        this.Book = epub(content, {
            width: 400,
            height: 600,
            spreads: false
        });

        this.Book.renderTo('area').then(() => {
            console.log('ok epub rendered');
        }, (err) => {
            console.log('errore', err);
        });

        document.getElementById('prev').addEventListener('click', () => {
            this.Book.prevPage();
        });

        document.getElementById('next').addEventListener('click', () => {
            this.Book.nextPage();
        });

    }

}


let demo = new Demo();
demo.generate();

