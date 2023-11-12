<script>
	import { dev } from '$app/environment';
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import {
		AppBar,
		AppShell,
		Modal,
		Toast,
		initializeStores,
		storePopup
	} from '@skeletonlabs/skeleton';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
	import '../app.postcss';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	export let data;
	initializeStores();
</script>

<!-- App Shell -->
<svelte:head>
	<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
</svelte:head>
<QueryClientProvider client={data.queryClient}>
	<Modal />
	<Toast />
	<AppShell>
		<svelte:fragment slot="header">
			<!-- App Bar -->
			<AppBar>
				<svelte:fragment slot="lead">
					<strong class="text-xl uppercase">
						{#if dev && 'production'}
							<span class="text-red-500">[Development]</span>
						{:else}
							<span class="text-yellow-500">[Production]</span>
						{/if}
					</strong>
				</svelte:fragment>
				<svelte:fragment slot="trail">
					<a class="btn btn-sm variant-ghost-surface" href="/"> 홈 </a>
					<a class="btn btn-sm variant-ghost-surface" href="/board"> 게시판 </a>
					<a class="btn btn-sm variant-ghost-surface" href="/chat"> 채팅 </a>
				</svelte:fragment>
			</AppBar>
		</svelte:fragment>
		<!-- Page Route Content -->

		<slot />

		<svelte:fragment slot="pageFooter">푸터</svelte:fragment>
	</AppShell>
	<SvelteQueryDevtools />
</QueryClientProvider>
