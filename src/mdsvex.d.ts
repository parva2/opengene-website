declare module '*.md' {
	import type { Component } from 'svelte';

	const content: Component;
	export default content;

	export const metadata: Record<string, unknown>;
}
