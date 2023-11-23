export class StrapiRepository<T> {
    protected endpoint: string;
    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    protected async get(): Promise<T[]> {
        const res = await fetch(this.endpoint);
        if (!res.ok) {
            throw new Error('Query failed');
        }
        return await res.json() as Promise<T[]>;
    }

    protected async getByQuery(query: string): Promise<T> {
        const res = await fetch(`${this.endpoint}?${query}`);
        if (!res.ok) {
            throw new Error('Query failed');
        }
        return await res.json() as T;
    }


    protected async create(payload: string): Promise<T> {
        const res = await fetch(`${this.endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: payload
        });
        if (!res.ok) {
            throw new Error('Create failed');
        }
        return await res.json() as T;
    }

    protected async update(payload: string, id: string): Promise<T> {
        const res = await fetch(`${this.endpoint}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: payload
        });
        if (!res.ok) {
            throw new Error('Create failed');
        }
        return await res.json() as T;
    }


}