<script lang="ts">
	import { page } from '$app/state';
	import { IconMenu, IconX } from '@tabler/icons-svelte';
	import { fade } from 'svelte/transition';
	import { MobileMenuState } from '$lib/state/mobileMenu.svelte';

	const mobileMenu = MobileMenuState.get();

	type Link = {
		path: string;
		label: string;
		newTab?: boolean;
	};

	const links: Link[] = [
		{
			path: '/about',
			label: 'About'
		},
		{
			path: '/blog',
			newTab: true,
			label: 'Blog'
		},
		{
			path: '/whitepaper.pdf',
			newTab: true,
			label: 'Whitepaper'
		},
		{
			path: '/contact',
			newTab: true,
			label: 'Contact'
		}
	];
</script>

<div class="top-0 z-10 flex h-20 w-full items-center justify-center">
	<nav class="text-md contain flex h-full w-full items-center justify-between">
		<img class="w-[120px]" src="/logo.svg" alt="logo" />
		<div class="flex items-center gap-3 showNavLinks:hidden">
			<button
				class="nav-item col-start-3 justify-self-end showNavLinks:hidden"
				name="menu"
				aria-label="menu"
				onclick={() => mobileMenu.toggle()}
			>
				{#if mobileMenu.isOpen}
					<div in:fade={{ duration: 250 }}>
						<IconX />
					</div>
				{:else}
					<div in:fade={{ duration: 250 }}>
						<IconMenu />
					</div>
				{/if}
			</button>
		</div>
		<div class="hidden items-center justify-end gap-4 showNavLinks:flex">
			<div class="flex items-center gap-8">
				{#each links as link}
					<a
						class="hover:text-fg text-muted transition-colors"
						target={link.newTab ? '_blank' : '_self'}
						href={link.path}
					>
						{link.label}
					</a>
				{/each}
			</div>
		</div>
	</nav>
</div>

<!-- <style lang="postcss">
	a {
		@apply hover:text-muted-foreground;
	}
</style> -->
