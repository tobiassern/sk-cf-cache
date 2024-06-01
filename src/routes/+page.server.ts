// import type { PageServerLoad } from './$types';
// import { json, error } from '@sveltejs/kit';

import type { PageServerLoad } from "./$types";

// export const load: PageServerLoad = async (event) => {
// 	const cacheUrl = new URL(event.url);
// 	const cache = event.platform?.caches.default;

// 	let response = await cache?.match(cacheUrl);
// 	if (!cache) {
// 		return error(400);
// 	}
// 	if (!response) {
// 		console.log(
// 			`Response for request url: ${cacheUrl} not present in cache. Fetching and caching request.`
// 		);
// 		response = json({ date: new Date() });
// 		response.headers.append('Cache-Control', 's-maxage=10');

// 		event.platform?.context.waitUntil(cache.put(cacheUrl, response.clone()));
// 	} else {
// 		console.log(`Cache hit for: ${cacheUrl}.`);
// 	}
// 	return response;
// };
export const load: PageServerLoad = async (event) => {

    return {
        date: new Date()
    }
}