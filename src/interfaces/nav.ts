export interface Nav {
    toc: {
        href: string,
        label: string
        id: string
    }[],
    landmarks: {
        type: string,
        href: string,
    }[]

}