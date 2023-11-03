<script>
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
	import { browser } from '$app/environment';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	export let data;
</script>

<!-- App Shell -->
<QueryClientProvider client={data.queryClient}>
	<AppShell>
		<svelte:fragment slot="header">
			<!-- App Bar -->
			<AppBar>
				<svelte:fragment slot="lead">
					<strong class="text-xl uppercase" />
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
