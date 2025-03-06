<script lang="ts">
	import { IconCoins, IconDna, IconLock } from '@tabler/icons-svelte';

	const cards = [
		{
			title: 'Ethical monetization',
			body: 'No longer is your DNA just a static piece of information; it becomes a dynamic resource that you control, use, and even profit from while contributing to science.',
			icon: IconCoins
		},
		{
			title: 'Genetic analysis',
			body: 'You’ll get actionable insights ranging from disease risk assessments to tailored nutritional guidance. OpenGene can suggest lifestyle modifications to mitigate risks.',
			icon: IconDna
		},
		{
			title: 'Full security',
			body: 'You retain full ownership of your data. OpenGene’s decentralized identity system ensures that users can revoke access or alter permissions at any time.',
			icon: IconLock
		}
	];
</script>

<div class="flex flex-col gap-2 showNavLinks:flex-row">
	{#each cards as card}
		<div class="flex w-full flex-col gap-3 rounded-lg border-[0.5px] border-border p-6">
			<div class="flex items-center gap-2">
				<card.icon />
				<p>{card.title}</p>
			</div>
			<p class="max-w-prose text-sm text-muted">{card.body}</p>
		</div>
	{/each}
</div>
