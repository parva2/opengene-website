<script lang="ts">
	import { IconChevronRight, IconMail, IconRosetteDiscountCheckFilled } from '@tabler/icons-svelte';

	const benefits = ['100% anonymous', 'Revocable access', 'Instant payouts'];
</script>

<section
	class="relative mt-10 flex w-full flex-col justify-between text-center sm:flex-row showNavLinks:mt-20"
>
	<div
		class="-z-1 pointer-events-none fixed size-[1200px] rounded-full bg-blue-50/60 blur-3xl"
	></div>
	<div class="z-2 flex w-full flex-col gap-2 *:text-left">
		<h1 class="text-fg text-[3.4rem] leading-[1] tracking-tighter">
			Get paid <br class="hidden showNavLinks:block" /> for your genes.
		</h1>
		<p class="mt-3 text-xl font-light leading-snug text-muted">
			Earn every time your anonymized 23andMe or <br class="hidden sm:block" /> AncestryDNA report gets
			used by scientists.
		</p>
		<div class="my-4 flex flex-col gap-2">
			{#each benefits as benefit}
				<div class="flex items-center gap-2">
					<IconRosetteDiscountCheckFilled color={'green'} />
					<p>{benefit}</p>
				</div>
			{/each}
		</div>
		<form class="flex h-10 w-full max-w-[410px] items-center">
			<label for="simple-search" class="sr-only">Search</label>
			<div class="relative h-full w-full">
				<div
					class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4 text-muted"
				>
					<IconMail stroke={1.5} size={'1.4rem'} />
				</div>
				<input
					type="text"
					id="simple-search"
					class="block h-full w-full rounded-l-lg border border-r-0 border-border bg-transparent p-2.5 ps-12"
					placeholder="Email address"
					required
				/>
			</div>
			<button
				type="submit"
				class="text-bg flex h-full min-w-fit cursor-pointer items-center justify-center gap-1 rounded-r-full border-0 border-none bg-primary px-6 py-2.5 hover:brightness-95"
			>
				Join waitlist
				<span class="mt-[1px]"><IconChevronRight size={'1.2rem'} /></span>
				<span class="sr-only">Search</span>
			</button>
		</form>
		<p class="mt-3 flex items-center gap-2 text-sm font-light text-muted">
			<span class="relative flex size-2">
				<span
					class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"
				></span>
				<span class="relative inline-flex size-2 rounded-full bg-primary"></span>
			</span>
			3,600+ people are waiting for launch.
		</p>
	</div>
	<img
		class="z-1 pointer-events-none hidden h-[290px] w-auto min-w-fit max-w-[50%] select-none showNavLinks:block"
		src="/genie.png"
		alt="DNA strand"
	/>
</section>
