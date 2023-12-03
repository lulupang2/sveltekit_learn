<script>
	let tools = [{}];
</script>

<div class="toolbox">
	{#each tools as tool}
		<div class="tool">
			<img src={tool.icon} alt={tool.name} />
			<span>{tool.name}</span>
		</div>
	{/each}
</div>

<style>
	.toolbox {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
	}
</style>
