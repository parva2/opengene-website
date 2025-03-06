<script lang="ts">
	import { page } from '$app/state';
	import PageTitle from '$layout/PageTitle.svelte';
	import { TitleState } from '$lib/state/pageTitle.svelte';

	let { class: className = '', children } = $props();

	let title = TitleState.get();

	function getTitle(title: string) {
		const isError = page.status > 399;
		const errorTitle = page.error?.title;
		if (errorTitle) {
			return errorTitle;
		} else if (isError) {
			return 'Error — ' + page.status;
		}
		return title;
	}
</script>

<div
	class="container mt-10 flex min-h-[70vh] w-full flex-col items-center gap-10 pb-[15vh] {className}"
>
	{#if !title?.hidden}
		<PageTitle title={getTitle(page.data.title)} />
	{/if}
	{@render children()}
</div>
