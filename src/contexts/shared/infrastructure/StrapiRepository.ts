import { request } from "./utils/request";

export class StrapiRepository<T> {
    protected endpoint: string;
    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    protected async get(query?:string): Promise<T[]> {
        const res = await fetch(`${this.endpoint}${query}` );
        if (!res.ok) {
            throw new Error('Query failed');
        }
        return await res.json() as Promise<T[]>;
    }

    protected async getByQuery(query: string): Promise<T> {
        const res = await request(`${this.endpoint}?${query}`);
        if (!res.ok) {
            throw new Error(`Query ${query} failed`);
        }
        return await res.json() as T;
    }


    protected async create(payload: string): Promise<T> {
        const res = await request(`${this.endpoint}`, 'POST', payload);
        if (!res.ok) {
            throw new Error('Create failed');
        }
        return await res.json() as T;
    }

    protected async update(payload: string, id: string): Promise<T> {
        const res = await request(`${this.endpoint}/${id}`, 'PUT', payload);
        if (!res.ok) {
            throw new Error('Update failed');
        }
        return await res.json() as T;
    }



}
