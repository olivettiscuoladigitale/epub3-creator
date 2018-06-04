
export interface BaseInfo {
    uuid: string,
    author: string,
    language: string,
    modificationDate: string,
    rights: {
        description: string,
        license: string
    },
    attributionUrl: string,
    cover: {
        file: string,
        asFileName?: string,
        base64?: string,
        license: string,
        mediaType: string,
        attributionUrl: string,
        inline: string
    },
    title: string,
    publicationDate: string,
    media?: {
        activeClass?: string,
        duration?: Array<{
            refines: string,
            value: string
        }>
    },
    rendition?: {
        layout?: string,
        orientation?: string,
        spread?: string
    }
}