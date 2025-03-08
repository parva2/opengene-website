<script lang="ts">
	import { IconCoins, IconDna, IconLock } from '@tabler/icons-svelte';

	const cards = [
		{
			title: 'Jeff S.',
			img: '/jeff.png',
			body: 'I put in my 23andMe into the system and got paid shortly after with DoorDash credit. After joining the waitlist, I was sent information on their use of blockchain with enhanced encryption and learned that no one can see my data unless I get paid. Even today, I still randomly get paid for the data I donated once!'
		},
		{
			title: 'Jane W.',
			img: '/jane.png',
			body: 'I put in my Ancestry.com information and added in some of my basic medical history and got paid shortly after with Walmart credit. I also learned a few new things about my health and it recommended that I might be one of those individuals who may only need 6 hours of sleep!'
		},
		{
			title: 'Mitchell M.',
			img: '/mitch.png',
			body: "It took a month to get off of the waitlist but I am glad I signed up. Once I got into the platform, it was easy to use and I got paid quite quickly! I wasn't really familiar with blockchain or crypto but this application transcended that and really just focused on making the platform understandable and easy to use!"
		}
	];
</script>

<div class="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
	{#each cards as card, index}
		<div
			class="flex w-full flex-col gap-3 rounded-lg border-[0.5px] border-border p-6"
			class:md:col-span-2={index === 2}
			class:md:w-[50%]={index === 2}
			class:mx-auto={index === 2}
		>
			<div class="flex items-center gap-2">
				<img src={card.img} alt={card.img} class="size-8 rounded-full" />
				<p>{card.title}</p>
			</div>
			<p class="max-w-prose text-sm text-muted">"{card.body}"</p>
		</div>
	{/each}
</div>
