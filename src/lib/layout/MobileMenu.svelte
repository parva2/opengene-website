<!-- <script lang="ts">
	import { page } from '$app/state';
	import { site } from '$lib/index';
	import Button from '$ui/button/button.svelte';
	import { type ButtonProps } from '$ui/button/button.svelte';
	import { shortcut } from '$lib/helpers/app/shortcut';
	import Login from 'lucide-svelte/icons/log-in';
	import User from 'lucide-svelte/icons/user';
	import { fly } from 'svelte/transition';
	import { MobileMenuState } from '$lib/state/mobileMenu.svelte';
	import { browser } from '$app/environment';

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

	const btns: { [k: string]: ButtonProps & any } = {
		account: {
			variant: 'outline',
			title: 'Account',
			href: '/account',
			icon: User
		},
		login: {
			variant: 'outline',
			title: 'Log in',
			href: '/login',
			icon: Login
		}
	};
</script>

<svelte:window bind:innerWidth />

{#snippet btn(key: string)}
	{@const item = btns[key]}
	{@const Icon = item.icon}
	<Button {...item} class="max-w-xs">
		<Icon />
		{item.title}
	</Button>
{/snippet}

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
		transition:fly={{ x: 300 }}
		class="bg-background container absolute left-0 right-0 top-[4rem] z-50 flex h-screen w-screen min-w-min flex-col pb-20 pt-8"
	>
		<div class="flex flex-col items-start gap-4 *:w-full *:text-left">
			{#if page.data.user}
				{@render btn('account')}
			{:else}
				{@render btn('login')}
			{/if}
			{#if site.menuLinks}
				<div class="flex flex-col divide-y divide-dashed">
					{#each site.menuLinks as link}
						<div class="py-4">
							<a
								class="hover:text-muted-foreground"
								target={link.newTab ? '_blank' : '_self'}
								href={link.path}
							>
								{link.label}
							</a>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if} -->
