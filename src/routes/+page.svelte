<script lang="ts">
	import Hero from '$blocks/Hero.svelte';
	import Features from '$components/cards/Features.svelte';
	import Customers from '$components/cards/Customers.svelte';
	import Reviews from '$components/cards/Reviews.svelte';
</script>

<div class="contain mb-40 flex flex-col gap-20">
	<Hero />
	<Features />
	<div class="flex flex-col gap-12">
		<h2 class="text-center text-3xl tracking-tight">Built for everyone</h2>
		<Customers />
	</div>
	<div class="flex flex-col gap-12">
		<h2 class="text-center text-3xl tracking-tight">What our customers say</h2>
		<Reviews />
	</div>
</div>
