import { site } from '$lib/index';

export const fallbackMessage =
	'Something went wrong. Please try refreshing and checking back later. If the issue persists, please email ' +
	site.emails?.support +
	'.';

const errorMessages: Record<number, string> = {
	400: 'Bad request.',
	401: 'Authorization required.',
	403: 'Insufficient permission.',
	404: "The page you're looking for was not found.",
	429: "You've sent too many requests recently. Please try again later.",
	500: fallbackMessage
};

export function getFriendlyMessage(status: number) {
	return errorMessages[status] ?? fallbackMessage;
}

export function buildError(error: any, message: string, serverLogged?: boolean): App.Error {
	const status = error.status ?? 500;
	return {
		error: String('message' in error ? error.message : error),
		stackTrace: String(error.stack),
		serverLogged,
		status,
		message: getFriendlyMessage(status),
		rawMessage: message,
		title: 'Error — ' + status,
		id: crypto.randomUUID()
	};
}

export class CustomError extends Error {
	constructor(
		message: string,
		public status: number
	) {
		super(message);
		this.name = 'CustomError';
	}
}
