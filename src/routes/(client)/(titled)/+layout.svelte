<script lang="ts">
	import PageWrapper from '$layout/PageWrapper.svelte';
	import { TitleState } from '$lib/state/pageTitle.svelte';

	let { children } = $props();

	TitleState.get()?.show();
</script>

<PageWrapper>
	{@render children()}
</PageWrapper>
