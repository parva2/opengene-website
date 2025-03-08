<script lang="ts">
	import { page } from '$app/state';
	import PageWrapper from '$layout/PageWrapper.svelte';
	import { TitleState } from '$lib/state/pageTitle.svelte';

	TitleState.get().show();
</script>

<PageWrapper>
	{#if page.status > 499 && page.error?.id}
		<p class="max-w-prose text-center">Error ID: {page.error.id}</p>
	{/if}
	<p class="max-w-sm text-center">{page.error?.message}</p>
</PageWrapper>
