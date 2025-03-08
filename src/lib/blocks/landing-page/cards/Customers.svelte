<script lang="ts">
	const cards = [
		{
			title: 'Individuals',
			blob: '/1.png',
			body: 'We allow users to sequence their DNA—often for free or at a minimal cost (around $50 for full genome sequencing)—and retain full ownership of their data. Our decentralized identity system ensures that users can revoke access or alter permissions at any time.'
		},
		{
			title: 'Pharmaceutical Companies',
			blob: '/2.png',
			body: 'Our platform offers pharmaceutical companies direct access to pre-screened, consented genetic data from a global pool of participants. This streamlines the recruitment process—from years to mere months—significantly reducing R&D expenses.'
		},
		{
			title: 'Academic Institutions',
			blob: '/3.png',
			body: 'Our tiered pricing structure—ranging from $200 to $500 per dataset for smaller studies or subscription-based models for larger initiatives—enables academic researchers to accelerate discoveries while upholding strict ethical standards.'
		},
		{
			title: 'Researchers',
			blob: '/4.png',
			body: "Recruiting participants for clinical studies is a time-consuming and costly endeavor. Our platform's global reach and targeted matching algorithms allow researchers to quickly assemble diverse cohorts pre-screened for specific genetic markers."
		}
	];
</script>

<div class="grid gap-2 showNavLinks:grid-cols-2">
	{#each cards as card}
		<div
			class="flex flex-col gap-3 rounded-lg border-[0.5px] border-border bg-cover bg-center p-6"
			style="background-image: url({card.blob});"
		>
			<p class="text-xs font-semibold uppercase tracking-widest">{card.title}</p>
			<p class="max-w-prose text-sm">{card.body}</p>
		</div>
	{/each}
</div>
