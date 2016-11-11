import {BaseInfo} from '../../interfaces/base-info';

export class Epub3Template {

    _mimetype(): string {
        return `application/epub+zip`;
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

    _opf(prop: BaseInfo, metadataCoverFragment: string, manifestFragment: string) {
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
            `
    }


    _nav(cssFiles: string, landmarks: string, toc: string) {


        return `<?xml version="1.0" encoding="UTF-8"?>
                <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en" xmlns:epub="http://www.idpf.org/2007/ops">
                    <head>
                        <meta charset="utf-8"></meta>
                        ${cssFiles}
                    </head>
                    <body>
                        <nav epub:type="toc" id="toc">			
                            <ol>
                              ${toc}
                            </ol>
                        </nav>
                        <nav epub:type="landmarks">
                            <ol>
                             ${landmarks}
                            </ol>
                        </nav>
                    </body>
                </html>`
    }


    _ncx(prop: BaseInfo, toc): string {
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
                        ${toc}
                    </navMap>
                </ncx>
                    `
    }


    _contentBody(prop: BaseInfo, content, cssFiles) {
        return `<?xml version="1.0" encoding="UTF-8"?>
                <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en" xmlns:epub="http://www.idpf.org/2007/ops">
                    <head>
                        <meta charset="utf-8"></meta>
                        <title>${prop.title}</title>
                         ${cssFiles}
                    </head>
                    <body>
                     ${content}
                    </body>
                </html>
                `
    }


}