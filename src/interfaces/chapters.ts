import {MetaDef} from './meta-def';

export interface Chapters {
    name: string,
    content: string,
    inline?: string,
    id?: string,
    asfirst?: boolean,
    metadata?: MetaDef[]
}