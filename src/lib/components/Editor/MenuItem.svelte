<script>
	import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg';

	export let isActive;
	export let icon;
	export let action;
	export let title;
</script>

<div>
	<button
		class={`menu-item${isActive && isActive() ? ' is-active' : ''}`}
		on:click={action}
		{title}
	>
		<svg class="remix">
			<use xlink:href={`${remixiconUrl}#ri-${icon}`} />
		</svg>
	</button>
</div>
