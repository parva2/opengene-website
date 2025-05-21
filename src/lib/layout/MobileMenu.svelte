<script lang="ts">
	import { page } from '$app/state';
	import { site } from '$lib/index';
	import { fly } from 'svelte/transition';
	import { MobileMenuState } from '$lib/state/mobileMenu.svelte';
	import { browser } from '$app/environment';
	import { shortcut } from '$lib/helpers/app/shortcut';

	let innerWidth = $state(320);

	const mobileMenu = MobileMenuState.get();

	$effect(() => {
		if (innerWidth > 870) {
			mobileMenu.isOpen = false;
		}
	});

	$effect(() => {
		if (browser && mobileMenu.isOpen) {
			document.body.classList.add('no-doc-scroll');
		} else if (browser && !mobileMenu.isOpen) {
			document.body.classList.remove('no-doc-scroll');
		}
	});

	const links = [
		{
			path: '/about',
			label: 'About'
		},
		{
			path: 'https://bloggeney1.hashnode.dev/',
			newTab: true,
			hidden: true,
			label: 'Blog'
		},
		{
			path: '/whitepaper.pdf',
			newTab: true,
			label: 'Whitepaper'
		},
		{
			path: 'https://airtable.com/appszbSL9vv2LcQww/pagTliTGfOOWcIOsV/form',
			newTab: true,
			label: 'Contact'
		}
	];
</script>

<svelte:window bind:innerWidth />

{#if mobileMenu.isOpen}
	<div
		use:shortcut={{
			shortcuts: [
				{
					code: 'Escape',
					callback: () => {
						mobileMenu.close();
					}
				}
			]
		}}
		transition:fly={{ y: 500 }}
		class="contain bg-background absolute top-[4rem] right-0 left-0 z-50 flex h-screen min-w-min flex-col bg-white pt-8 pb-20"
	>
		<div class="flex flex-col items-start gap-4 *:w-full *:text-left">
			<div class="divide-border flex flex-col divide-y divide-dashed">
				{#each links as link}
					{#if !link.hidden}
						<div class="py-4">
							<a
								class="hover:text-fg text-muted"
								target={link.newTab ? '_blank' : '_self'}
								href={link.path}
							>
								{link.label}
							</a>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
{/if}
