// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			message: string;
			status?: number;
			error?: string;
			stackTrace?: string;
			rawMessage?: string;
			serverLogged?: boolean;
			stackTrace?: string;
			title?: string;
			id?: string;
		}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
