<script lang="ts">
	import { IconBrandX, IconBrandTelegram, IconBrandDiscord } from '@tabler/icons-svelte';

	type FooterLink = { label: string; href: string };
	type FooterSection = { title: string; links: FooterLink[] };

	const footerSections: FooterSection[] = [
		{
			title: 'Resources',
			links: [
				{ label: 'Brand', href: '#' },
				{ label: 'FAQ', href: '#' },
				{ label: 'Help & Support', href: '#' }
			]
		},
		{
			title: 'Developers',
			links: [
				{ label: 'Documentation', href: '#' },
				{ label: 'Technical Paper', href: '#' },
				{ label: 'Security', href: '#' }
			]
		},
		{
			title: 'Company',
			links: [
				{ label: 'Privacy Policy', href: '#' },
				{ label: 'Terms of Use', href: '#' },
				{ label: 'Contact', href: '#' }
			]
		}
	];

	type SocialLink = { icon: any; label: string; href: string };
	const socialLinks: SocialLink[] = [
		{ icon: IconBrandX, label: 'X (Twitter)', href: '#' },
		{ icon: IconBrandDiscord, label: 'Discord', href: '#' },
		{ icon: IconBrandTelegram, label: 'Telegram', href: '#' }
	];
</script>

<footer
	class="text-bg mx-[--site-padding] mb-40 w-full max-w-[--max-w-screen] rounded-lg bg-gradient-to-b from-primary to-blue-700 p-10 shadow-lg"
>
	<div class="flex flex-col space-y-12">
		<div class="flex flex-col justify-between md:flex-row">
			<div class="mb-8 md:mb-0">
				<a href="/" class="flex items-center">
					<img class="w-[120px]" src="/logo_white.svg" alt="logo" />
				</a>
				<p class="mt-6 text-sm opacity-90">
					© {new Date().getFullYear()} OpenGene. All rights reserved.
				</p>
			</div>

			<div class="flex flex-wrap gap-12">
				{#each footerSections as section}
					<div class="flex flex-col">
						<p class="mb-4 font-medium">{section.title}</p>
						<ul class="space-y-2">
							{#each section.links as link}
								<li>
									<a href={link.href} class="text-bg/90 hover:underline">{link.label}</a>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>

		<div class="flex space-x-3">
			{#each socialLinks as { icon: Icon, label, href }}
				<a {href} aria-label={label} class="transition-opacity hover:opacity-80">
					<Icon class="h-6 w-6" />
				</a>
			{/each}
		</div>
	</div>
</footer>
