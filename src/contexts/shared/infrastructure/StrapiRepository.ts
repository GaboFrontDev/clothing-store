import { StrapiPluralResponseEntity } from "../domain/StrapiPluralResponseEntity";
import { StrapiSingleItemResponseEntity } from "../domain/StrapiSingleItemResponseEntity";
import { strapiRequest } from "./utils/request";

export class StrapiRepository<T> {
    protected endpoint: string;
    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    protected async get(query?:string): Promise<StrapiPluralResponseEntity<T>> {
        const res = await strapiRequest(`${this.endpoint}${query}` );
        if (!res.ok) {
            throw new Error(`Query to ${this.endpoint} failed`);
        }
        return await res.json() as Promise<StrapiPluralResponseEntity<T>>;
    }

    protected async getSingleItem(query: string): Promise<StrapiSingleItemResponseEntity<T>> {
        if(!query) {
            throw new Error(`Missing required query param`);
        }
        const res = await strapiRequest(`${this.endpoint}${query}`);
        if (!res.ok) {
            throw new Error(`Query to ${this.endpoint} failed`);
        }
        return await res.json() as Promise<StrapiSingleItemResponseEntity<T>>;
    }

    protected async getByQuery(query: string): Promise<StrapiPluralResponseEntity<T>> {
        const res = await strapiRequest(`${this.endpoint}?${query}`);
        if (!res.ok) {
            throw new Error(`Query ${query} to ${this.endpoint} failed`);
        }
        return await res.json() as StrapiPluralResponseEntity<T>;
    }


    protected async create(payload: string): Promise<StrapiSingleItemResponseEntity<T>> {
        const res = await strapiRequest(`${this.endpoint}`, 'POST', payload);
        if (!res.ok) {
            throw new Error('Create failed');
        }
        return await res.json() as StrapiSingleItemResponseEntity<T>;
    }

    protected async update(payload: string, id: string): Promise<StrapiSingleItemResponseEntity<T>> {
        const res = await strapiRequest(`${this.endpoint}/${id}`, 'PUT', payload);
        if (!res.ok) {
            throw new Error('Update failed');
        }
        return await res.json() as StrapiSingleItemResponseEntity<T>;
    }
}
