import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex({ extensions: ['.svx', '.md'] })],

	kit: {
		adapter: adapter(),
		alias: {
			$blocks: 'src/lib/blocks',
			$components: 'src/lib/components',
			$layout: 'src/lib/layout'
		}
	},
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
