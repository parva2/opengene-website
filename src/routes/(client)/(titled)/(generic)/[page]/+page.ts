import TOS from './content/tos.md';
import PP from './content/pp.md';
import { error } from '@sveltejs/kit';

export const load = async ({ route, params }) => {
	const page = pages[params.page];
	if (!page) {
		error(404);
	}
	const { title, content } = page;
	return {
		title,
		content
	};
};

const pages: Record<string, any> = {
	'terms-of-service': { title: 'Terms of Service', content: TOS },
	'privacy-policy': { title: 'Privacy Policy', content: PP }
};
