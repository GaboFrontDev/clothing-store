import { StrapiAttributesEntity } from "./StrapiAttributesEntity";

export interface StrapiEntryEntity<T> {
    id: number| string;
    attributes: T & StrapiAttributesEntity;
}