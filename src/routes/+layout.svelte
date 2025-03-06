<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { updated } from '$app/state';
	import Meta from '$layout/Meta.svelte';
	import Footer from '$layout/Footer.svelte';
	import MobileMenu from '$layout/MobileMenu.svelte';
	import Navbar from '$layout/Navbar.svelte';
	import '../app.css';
	import { init } from './init';

	let { children } = $props();
	init();

	beforeNavigate(async ({ willUnload, to }) => {
		if (!updated.current && !willUnload && to?.url) {
			location.href = to.url.href;
		}
	});
</script>

<Meta />
<Navbar />
<!-- <MobileMenu /> -->
{@render children()}
<Footer />
