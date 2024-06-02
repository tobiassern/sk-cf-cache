import { error, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const cache = event.platform?.caches.default;
	if (event.url.pathname === '/revalidate') {
		return await resolve(event);
	} else {
		if (!cache) {
			console.log("Cachces doesn't exist on platform");
			return await resolve(event);
		}

		const cacheUrl = new URL(event.url);
		cacheUrl.searchParams.delete('cf_revalidate');
		console.log('## CACHE URL: ## ', cacheUrl.pathname);

		let response = await cache.match(cacheUrl.pathname);
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
		return response;
	}
};
