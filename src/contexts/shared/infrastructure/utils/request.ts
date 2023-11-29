import CONFIG from "@/config";

export function strapiRequest(url: string, method: 'GET' | 'POST' | 'PUT' = 'GET', payload?: string, ) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${CONFIG.STRAPI_TOKEN}`
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