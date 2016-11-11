import {FileContent} from '../../interfaces/file-content'
import {BaseInfo} from '../../interfaces/base-info';
import {CssDef} from '../../interfaces/css-def';

export class Epub3Template {

    _mimetype(): string {
        return `application/epub+zip`;
    }

    mimetype(): FileContent {
        let content: string = this._mimetype();
        return {
            name: "mimetype",
            folder: "",
            content: content
        }
    }

    _container(): string {
        return `<?xml version="1.0" encoding="UTF-8"?>
           <container xmlns="urn:oasis:names:tc:opendocument:xmlns:container" version="1.0">
	        <rootfiles>
		        <rootfile full-path="EPUB/ebook.opf" media-type="application/oebps-package+xml"/>
	        </rootfiles>
           </container>
             `
    }

    container(): FileContent {
        let content: string = this._container();
        return {
            name: "container.xml",
            folder: "META-INF",
            content: content
        }
    }

    _opf(prop: BaseInfo, css?: CssDef[]) {

        var metadataCoverFragment: string = "";
        var manifestFragment: string = "";
        var manifestCoverImage: string = "";

        var cssFiles = "";

        if (css) {
            let cssIdCounter = 0;
            for (let style of css) {
                let cssId = "css-" + cssIdCounter;
                cssFiles += `<item id="${cssId}" href="${style.name}" media-type="text/css" /> `;
                cssIdCounter++;
            }
        }


        if (prop.cover.file != "" && prop.cover.asFileName) {
            metadataCoverFragment = `<!-- rights expression for the cover image -->       
                    <link rel="cc:license" refines="#cover" href="${prop.cover.license}" />
                    <link rel="cc:attributionURL" refines="#cover" href="${prop.cover.attributionUrl}" />        
                    <!-- cover meta element included for 2.0 reading system compatibility: -->
                    <meta name="cover" content="cover"/>`;

            manifestCoverImage = `<item id="cover" href="${prop.cover.asFileName}" media-type="${prop.cover.mediaType}" properties="cover-image" />`;
        }

        manifestFragment += manifestCoverImage;
        manifestFragment += `<item id="t1" href="ebook-content.xhtml" media-type="application/xhtml+xml" />`;
        manifestFragment += `<item id="nav" href="ebook-nav.xhtml" properties="nav" media-type="application/xhtml+xml" />`;
        manifestFragment += `<!-- ncx included for 2.0 reading system compatibility: -->
                            <item id="ncx" href="ebook.ncx" media-type="application/x-dtbncx+xml" />`;

        manifestFragment += cssFiles;


        return `<?xml version="1.0" encoding="UTF-8"?>
            <package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="uid" xml:lang="${prop.language}" prefix="cc: http://creativecommons.org/ns#">
                <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
                    <dc:identifier id="uid">${prop.uuid}</dc:identifier>
                    <dc:title>${prop.title}</dc:title>
                    <dc:creator>${prop.author}</dc:creator>
                    <dc:language>${prop.language}</dc:language>
                    <dc:date>${prop.publicationDate}</dc:date>
                    <meta property="dcterms:modified">${prop.modificationDate}</meta>
                    <!-- rights expressions for the work as a whole -->
                    <dc:rights>${prop.rights.description}</dc:rights>        
                    <link rel="cc:license" href="${prop.rights.description}"/>
                    <meta property="cc:attributionURL">${prop.attributionUrl}</meta>
                    ${metadataCoverFragment}
                </metadata> 
                <manifest>
                    ${manifestFragment}
                </manifest>
                <spine toc="ncx">
                    <itemref idref="t1" />        
                </spine>    
            </package>
            `;

    }

    opf(prop: BaseInfo, css?: CssDef[]) {
        let content: string = this._opf(prop, css);
        return {
            name: "ebook.opf",
            folder: "EPUB",
            content: content
        }
    }


    _nav() {
        return `<?xml version="1.0" encoding="UTF-8"?>
                <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en"
                    xmlns:epub="http://www.idpf.org/2007/ops">
                    <head>
                        <meta charset="utf-8"></meta>		
                    </head>
                    <body>
                        <nav epub:type="toc" id="toc">			
                            <ol>
                                <li><a href="ebook-content.xhtml#ch1">I. THE BURIAL OF THE DEAD</a></li>
                            </ol>
                        </nav>
                        <nav epub:type="landmarks">
                            <ol>
                            </ol>
                        </nav>
                    </body>
                </html>`
    }

    nav() {
        let content: string = this._nav();
        return {
            name: "ebook-nav.xhtml",
            folder: "EPUB",
            content: content
        }
    }


    _ncx(prop: BaseInfo): string {
        return `<?xml version="1.0" encoding="UTF-8"?>
                <ncx xmlns:ncx="http://www.daisy.org/z3986/2005/ncx/" xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1" xml:lang="en">
                    <head>
                        <meta name="dtb:uid" content="${prop.uuid}"/>
                    </head>
                    <docTitle>
                        <text>${prop.title}</text>
                    </docTitle>
                    <navMap>
                        <!-- 2.01 NCX: playOrder is optional -->
                        <navPoint id="ch1">
                            <navLabel>
                                <text>I. THE BURIAL OF THE DEAD</text>
                            </navLabel>
                            <content src="ebook-content.xhtml#ch1"/>
                        </navPoint>
                    </navMap>
                </ncx>
                    `
    }

    ncx(prop: BaseInfo) {
        let content: string = this._ncx(prop);
        return {
            name: "ebook.ncx",
            folder: "EPUB",
            content: content
        }
    }


    _contentBody(prop: BaseInfo, content, css?: CssDef[]) {

        var cssFiles = "";

        if (css) {
            for (let style of css) {
                let isAlternate = "";
                if (style.type == "night") isAlternate = "alternate ";

                cssFiles += `<link rel="${isAlternate}stylesheet" type="text/css" href="${style.name}" class="${style.type}" title="${style.type}"/> `;
            }
        }

        return `<?xml version="1.0" encoding="UTF-8"?>
                <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en" xmlns:epub="http://www.idpf.org/2007/ops">
                    <head>
                        <meta charset="utf-8"></meta>
                        <title>{{title}}</title>
                         ${cssFiles}
                    </head>
                    <body>
                     ${content}
                    </body>
                </html>
                `

    }

    contentBody(prop: BaseInfo, body, css?: CssDef[]) {
        let content: string = this._contentBody(prop, body, css);
        return {
            name: "ebook-content.xhtml",
            folder: "EPUB",
            content: content
        }
    }


}