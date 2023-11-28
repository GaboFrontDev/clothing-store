import { StrapiEntryEntity } from "./StrapiEntity";


export interface StrapiSingleItemResponseEntity<T> {
    data: StrapiEntryEntity<T>
}