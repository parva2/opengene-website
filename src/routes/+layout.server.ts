import type { LayoutServerLoad } from './$types';
import { site } from '$lib/index';

export const load: LayoutServerLoad = async ({ locals }) => {
	return {
		title: site.name
	};
};
