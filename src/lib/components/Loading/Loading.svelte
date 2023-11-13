<script>
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { afterNavigate } from '$app/navigation';

	const progress = tweened(0, {
		duration: 3500,
		easing: cubicOut
	});

	onMount(() => {
		progress.set(0.7);
	});

	afterNavigate(() => progress.set(1, { duration: 1000 }));
</script>

<div class="fixed inset-0 h-2">
	<div class="progress bg-blue-500 h-full" style={`--width: ${$progress * 100}%`} />
</div>

<style>
	.progress {
		width: var(--width);
	}
</style>
