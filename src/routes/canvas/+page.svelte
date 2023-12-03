<script>
	import { onMount } from 'svelte';

	let canvas;
	let ctx;

	onMount(() => {
		canvas = document.getElementById('myCanvas');
		ctx = canvas.getContext('2d');

		ctx.fillStyle = 'red';
		ctx.fillRect(10, 10, 100, 100);
	});
</script>

<canvas id="myCanvas" />
