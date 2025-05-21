<script lang="ts">
	import { IconCoins, IconDna, IconLock } from '@tabler/icons-svelte';
	import { fly } from 'svelte/transition';

	const cards = [
		{
			title: 'Transparent Rewards',
			body: "Your genome isn't locked in a lab anymore. Upload once, see exactly when and how it's used, and earn automatic payouts—no middlemen, no geographic limits.",
			icon: IconCoins
		},
		{
			title: 'AI-Powered Health Insights',
			body: 'OpenGene ingests any 23andMe, Ancestry, or clinical VCF file, then runs deep AI analysis to deliver disease-risk scores, medication guidance, and lifestyle recommendations you can act on today.',
			icon: IconDna
		},
		{
			title: 'Zero-Compromise Security',
			body: 'You retain 100 % ownership. Data are encrypted, anonymity, and stored on a verifiable blockchain; permissions can be changed—or revoked—whenever you choose.',
			icon: IconLock
		}
	];
</script>

<div class="showNavLinks:flex-row flex flex-col gap-2">
	{#each cards as card}
		<div
			class="border-border flex w-full flex-col gap-3 rounded-lg border-[0.5px] p-6 px-4 backdrop-blur-lg"
		>
			<div class="flex items-center gap-2">
				<card.icon />
				<p class="text-sm">{card.title}</p>
			</div>
			<p class="text-muted max-w-prose text-sm">{card.body}</p>
		</div>
	{/each}
</div>
