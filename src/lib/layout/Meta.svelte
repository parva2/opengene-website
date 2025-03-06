<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.data.title ?? 'OpenGene'}</title>
</svelte:head>
