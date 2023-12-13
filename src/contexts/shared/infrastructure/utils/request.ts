import CONFIG from "@/config";

export function strapiRequest(url: string, method: 'GET' | 'POST' | 'PUT' = 'GET', payload?: string, ) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${CONFIG.STRAPI_TOKEN}`
        },
    };
    if(method === 'GET') {
        console.log(`Calling GET: ${CONFIG.STRAPI_URL}/${url}`);        
        return fetch(`${CONFIG.STRAPI_URL}/${url}` , {
            ...options,
        });
    }
    console.log(`Calling ${method}: ${CONFIG.STRAPI_URL}/${url}`);
    return fetch(`${CONFIG.STRAPI_URL}/${url}`, {
        ...options,
        body: payload
    });
}