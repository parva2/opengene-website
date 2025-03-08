<script lang="ts">
	import { IconBrandX, IconBrandTelegram, IconBrandDiscord } from '@tabler/icons-svelte';
	import Logo from '$components/brand/Logo.svelte';

	type FooterLink = { label: string; href: string };
	type FooterSection = { title: string; links: FooterLink[] };

	const footerSections: FooterSection[] = [
		{
			title: 'Resources',
			links: [{ label: 'Blog', href: 'https://bloggeney1.hashnode.dev/' }]
		},
		{
			title: 'Developers',
			links: [{ label: 'Whitepaper', href: '/whitepaper.pdf' }]
		},
		{
			title: 'Company',
			links: [
				{ label: 'Privacy Policy', href: '/privacy-policy' },
				{ label: 'Terms of Service', href: '/terms-of-service' },
				{ label: 'Contact', href: 'https://airtable.com/appszbSL9vv2LcQww/pagTliTGfOOWcIOsV/form' }
			]
		}
	];

	type SocialLink = { icon: any; label: string; href: string };
	const socialLinks: SocialLink[] = [
		{ icon: IconBrandX, label: 'X (Twitter)', href: 'https://x.com/GenieProtocol1' },
		{ icon: IconBrandDiscord, label: 'Discord', href: 'https://discord.gg/eGegZsDt' }
	];
</script>

<div class="contain mb-40 flex w-full flex-col items-center justify-center">
	<footer
		class="text-bg flex w-full flex-col gap-10 rounded-lg bg-gradient-to-b from-primary to-blue-700 px-10 py-10 shadow-lg"
	>
		<div class="flex flex-col justify-between gap-10 md:flex-row">
			<div class="mb-4 flex flex-col">
				<Logo path={'/logo_white.svg'} />
				<p class="mt-6 text-sm opacity-90">
					© {new Date().getFullYear()} OpenGene. All rights reserved.
				</p>
			</div>

			<div class="flex flex-wrap gap-12">
				{#each footerSections as section}
					<div class="flex flex-col">
						<p class="mb-4 font-medium">{section.title}</p>
						<div class="flex flex-col gap-2">
							{#each section.links as link}
								<a href={link.href} class="text-bg/90 hover:underline">{link.label}</a>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="flex gap-3">
			{#each socialLinks as { icon: Icon, label, href }}
				<a target="_blank" {href} aria-label={label} class="transition-opacity hover:opacity-80">
					<Icon class="h-6 w-6" />
				</a>
			{/each}
		</div>
	</footer>
	<div class="flex w-full flex-col items-center gap-2">
		{#each { length: 5 }, n}
			<div
				style="width: {170 / n}%"
				class="h-[3px] max-w-full rounded-full bg-gradient-to-r from-primary to-blue-300"
			></div>
		{/each}
	</div>
</div>
