<script>
	import Toolbox from './Toolbox.svelte';
	let isSidebar = false;
</script>

<main class="flex">
	<nav class="w-1/6 bg-current h-screen">
		<Toolbox />
	</nav>

	<div class="flex-grow">
		<slot />
	</div>
</main>

<style>
</style>
