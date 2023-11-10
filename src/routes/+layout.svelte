<script>
	import { AppBar, AppShell, Modal, Toast, initializeStores } from '@skeletonlabs/skeleton';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
	import '../app.postcss';
	// Floating UI for Popups
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	export let data;
	initializeStores();
</script>

<!-- App Shell -->
<QueryClientProvider client={data.queryClient}>
	<Modal />
	<Toast />
	<AppShell>
		<svelte:fragment slot="header">
			<!-- App Bar -->
			<AppBar>
				<svelte:fragment slot="lead">
					<strong class="text-xl uppercase">
						{#if process.env.NODE_ENV === 'production'}
							<span class="text-red-500">[Production]</span>
						{/if}
						{#if process.env.NODE_ENV === 'local'}
							<span class="text-purple-500">[Local]</span>

							<span class="text-green-500">[Development]</span>
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
