import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
export const GET: RequestHandler = async (event) => {
	const cache = event.platform?.caches.default;
	await cache?.delete(event.url.searchParams.get('path') ?? '/');
	return json({ success: true });
};
