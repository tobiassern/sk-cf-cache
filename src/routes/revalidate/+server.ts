import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
export const GET: RequestHandler = async (event) => {
	await event.platform?.caches.delete(event.url.searchParams.get('path') ?? '/');
	return json({ success: true });
};
