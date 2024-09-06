import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { unfurl } from 'unfurl.js';

export const config = {
    isr: {
        expiration: false,
    },
};

export const GET: RequestHandler = async (event) => {
    const url = event.url.searchParams.get("url");
    if (!url) {
        return error(500);
    }
    const result = await unfurl(url, {
        follow: 5,
        oembed: false,
        timeout: 10000,
        fetch: event.fetch,
    })
    return json(result, {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    })
};