<script lang="ts">
	const cards = [
		{
			title: 'DNA Providers',
			blob: '/1.png',
			img: 'https://res.cloudinary.com/mediacdnmain/image/upload/v1747784592/image_1_gde7a0.png',
			subtitle: 'Own and Earn',
			body: "Upload an existing genetic file or sequence at partner labs for as little as $50. Your data stays encrypted and under your control—yet earns you automatic payouts every time it's used for research, plus instant AI-powered health insights you can act on today."
		},
		{
			title: 'Pharmaceutical Companies',
			blob: '/2.png',
			subtitle: 'Recruit in Weeks, Not Years',
			img: 'https://res.cloudinary.com/mediacdnmain/image/upload/v1747784593/image_2_pga3rv.png',
			body: "Tap a pre-screened, permissioned pool of global genomes. Smart-contract licensing trims recruitment costs and cuts R&D timelines from years to mere months—all while meeting the industry's most demanding compliance standards."
		},
		{
			title: 'Academic Institutions',
			blob: '/3.png',
			subtitle: 'Affordable, Ethics-Ready Datasets',
			img: 'https://res.cloudinary.com/mediacdnmain/image/upload/v1747784592/image_3_vzscto.png',
			body: `Pay per dataset or subscribe for always-on access to diverse cohorts that continually update. Built-in consent trails and GDPR-level privacy let you accelerate publications without compromising participant trust or IRB requirements.`
		},
		{
			title: 'Researchers',
			blob: '/4.png',
			img: 'https://res.cloudinary.com/mediacdnmain/image/upload/v1747784592/image_4_i8mpa5.png',
			subtitle: 'Instant, Targeted Cohort Matching',
			body: `Our AI matching engine finds participants who meet precise genetic markers in minutes, not months. Assemble statistically powerful, diversity-balanced study groups and focus your time on discovery, not recruitment.`
		}
	];
</script>

<div class="showNavLinks:grid-cols-2 grid gap-4">
	{#each cards as card}
		<div
			class="border-border flex flex-col rounded-lg border-[0.5px] bg-cover bg-center"
			style="background-image: url({card.blob});"
		>
			<div class="relative flex flex-col gap-2">
				<img class="rounded-t-lg" src={card.img} alt="" />
				<p
					class="absolute bottom-4 left-4 text-lg text-white uppercase drop-shadow-[5px_5px_10px_rgba(0,0,0,0.85)]"
				>
					{card.title}
				</p>
			</div>
			<p class="mx-4 mt-6 font-medium">{card.subtitle}</p>
			<p class="m-4 mb-6 max-w-prose text-sm">{card.body}</p>
		</div>
	{/each}
</div>
