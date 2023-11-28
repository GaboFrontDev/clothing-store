import { StrapiEntryEntity } from "./StrapiEntity";

export interface StrapiPluralResponseEntity<T> {
    data: StrapiEntryEntity<T>[]
}