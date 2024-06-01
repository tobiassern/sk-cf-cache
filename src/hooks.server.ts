import { error, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const cache = event.platform?.caches.default;
	const cacheUrl = new URL(event.url);

	if (!cache) error(400);
	let response = await cache.match(cacheUrl);

	if (!response) {
		console.log(
			`Response for request url: ${cacheUrl} not present in cache. Fetching and caching request.`
		);
		response = await resolve(event);
		response.headers.append('Cache-Control', 's-maxage=60');

		event.platform?.context.waitUntil(cache.put(cacheUrl, response.clone()));
	} else {
		console.log(`Cache hit for: ${cacheUrl}.`);
	}

	// if (event.url.pathname.startsWith('/custom')) {
	// 	return new Response('custom response');
	// }

	return response;
};

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
