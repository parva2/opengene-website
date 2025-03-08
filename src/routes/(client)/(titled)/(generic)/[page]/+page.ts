import TOS from './content/tos.md';
import PP from './content/pp.md';
import { error } from '@sveltejs/kit';

export const load = async ({ route, params }) => {
	const { title, content } = pages[params.page];
	if (!title) {
		error(404);
	}
	return {
		title,
		content
	};
};

const pages: Record<string, any> = {
	'terms-of-service': { title: 'Terms of Service', content: TOS },
	'privacy-policy': { title: 'Privacy Policy', content: PP }
};
