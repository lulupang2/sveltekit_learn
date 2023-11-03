<script>
	import MenuBar from './MenuBar.svelte';
	import './styles.scss';

	export let element;
	export let editor;
</script>

{#if editor}
	<MenuBar {editor} />
{/if}
