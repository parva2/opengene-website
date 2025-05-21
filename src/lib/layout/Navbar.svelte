<script lang="ts">
	import Logo from '$components/brand/Logo.svelte';
	import { page } from '$app/state';
	import { IconMenu, IconX } from '@tabler/icons-svelte';
	import { fade } from 'svelte/transition';
	import { MobileMenuState } from '$lib/state/mobileMenu.svelte';

	const mobileMenu = MobileMenuState.get();

	type Link = {
		path: string;
		label: string;
		newTab?: boolean;
		hidden?: boolean;
	};

	const links: Link[] = [
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

<div class="top-0 z-10 flex h-20 w-full items-center justify-center">
	<nav class="text-md contain flex h-full w-full items-center justify-between">
		<Logo />
		<button
			class="nav-item showNavLinks:hidden col-start-3 cursor-pointer justify-self-end"
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
		<div class="showNavLinks:flex hidden items-center justify-end gap-4">
			<div class="flex items-center gap-8">
				{#each links as link}
					{#if !link.hidden}
						<a
							class="hover:text-fg text-muted transition-colors"
							target={link.newTab ? '_blank' : '_self'}
							href={link.path}
						>
							{link.label}
						</a>
					{/if}
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
