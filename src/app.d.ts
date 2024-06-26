// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			caches: CacheStorage & { default: Cache };
			context: {
				waitUntil(promise: Promise<any>): void;
			};
		}
	}
}

export {};
