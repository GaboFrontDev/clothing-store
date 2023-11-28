interface StrapiEntryEntity<T> {
    id: number| string;
    attributes: T;
}

export interface StrapiResponseEntity<T> {
    data: StrapiEntryEntity<T> | StrapiEntryEntity<T>[]
}