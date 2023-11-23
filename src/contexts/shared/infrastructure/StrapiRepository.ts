import CONFIG from "@/config";

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
        const res = await this.request(`${this.endpoint}?${query}`);
        if (!res.ok) {
            throw new Error('Query failed');
        }
        return await res.json() as T;
    }


    protected async create(payload: string): Promise<T> {
        const res = await this.request(`${this.endpoint}`, 'POST', payload);
        if (!res.ok) {
            throw new Error('Create failed');
        }
        return await res.json() as T;
    }

    protected async update(payload: string, id: string): Promise<T> {
        const res = await this.request(`${this.endpoint}/${id}`, 'PUT', payload);
        if (!res.ok) {
            throw new Error('Create failed');
        }
        return await res.json() as T;
    }

    private async request(url: string, method: 'GET' | 'POST' | 'PUT' = 'GET', payload?: string, ) {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        if(method === 'GET') {
            return fetch(`${CONFIG.STRAPI_URL}/${url}` , {
                ...options,
            });
        }
        return fetch(url, {
            ...options,
            body: payload
        });
    }


}