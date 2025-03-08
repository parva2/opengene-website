<script>
	let { path = '/logo.svg' } = $props();
</script>

<a href="/" class="max-w-[120px]">
	<img class="w-fit min-w-0" src={path} alt="logo" />
</a>
