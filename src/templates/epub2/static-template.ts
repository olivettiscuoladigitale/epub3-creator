import {BaseInfo} from "../../interfaces/base-info";

/**
 * Static file template.
 * Leave this class without code.
 *
 * @author Giorgio Modoni <g.modoni@alfabook.it>
 */
export class StaticTemplate {

    _mimetype(): string {
        return `application/epub+zip`;
    }

    _container(): string {
        return `<?xml version="1.0"?>
                <container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
                    <rootfiles>
                        <rootfile full-path="EPUB/ebook.opf" media-type="application/oebps-package+xml"/>
                    </rootfiles>
                </container>
            `;
    }

    _opf(prop: BaseInfo, metadata: string, manifest: string, spine: string) {
        return `<?xml version="1.0" encoding="UTF-8"?>
        <package xmlns="http://www.idpf.org/2007/opf" version="2.0" unique-identifier="epub${prop.uuid}">
        <metadata xmlns:opf="http://www.idpf.org/2007/opf" xmlns:dc="http://purl.org/dc/elements/1.1/">
            <dc:identifier id="epub${prop.uuid}}" opf:scheme="ISBN">1111122233333</dc:identifier>
            <dc:title>Purity</dc:title>
            <dc:creator opf:role="aut" opf:file-as="${prop.author}">${prop.author}</dc:creator>
            <dc:publisher>${prop.attributionUrl}</dc:publisher>
            <dc:rights>${prop.rights.description}</dc:rights>
            <dc:language>${prop.language}</dc:language>  
            ${metadata}
        </metadata>
        <manifest>
            ${manifest}
        </manifest>
        <spine toc="toc">
            ${spine}
            <itemref idref="t1" />  
        </spine>
        <guide></guide>
        </package>`;
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
                </html>`;
    }


    _ncx(prop: BaseInfo, toc): string {

        return `<?xml version="1.0" encoding="UTF-8"?>
                            <!DOCTYPE ncx PUBLIC "-//NISO//DTD ncx 2005-1//EN" "http://www.daisy.org/z3986/2005/ncx-2005-1.dtd">
                            <ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1" xml:lang="${prop.language}">
                                <head>
                                    <meta name="dtb:uid" content="epub${prop.uuid}"/>
                                    <meta name="dtb:depth" content="1"/>
                                    <meta name="dtb:totalPageCount" content="0"/>
                                    <meta name="dtb:maxPageNumber" content="0"/>
                                </head>
                                <docTitle><text>${prop.title}</text></docTitle>
                                <docAuthor><text>${prop.author}</text></docAuthor>
                                <navMap>
                                  ${toc}
                                </navMap>
                            </ncx>`;
    }

    _contentBody(prop: BaseInfo, content, cssFiles: string) {
        return `<?xml version="1.0" encoding="UTF-8"?>
                        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
                        <html xmlns="http://www.w3.org/1999/xhtml">
                        <head>
                        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                        <title>${prop.title}</title>
                         ${cssFiles}
                        </head>
                        <body id="chapter" xml:lang="${prop.language}">
                        ${content}
                        </body>
                        </html>`;
    }

    _cover(prop: BaseInfo, cssFiles: string) {
        return `<?xml version="1.0" encoding="utf-8"?>
                <!DOCTYPE html>
                <html xmlns="http://www.w3.org/1999/xhtml">
                <head>
                  <title>${prop.title}</title>
                   ${cssFiles}
                  <meta charset="utf-8"/>
                </head>
                <body>
                  <div class="body"><img src="${prop.cover.asFileName}" alt="Cover Image" title="Cover Image"/></div>
                </body>
                </html>`;
    }

}