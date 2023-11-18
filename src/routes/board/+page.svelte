<script>
	import { goto } from '$app/navigation';
	import { getPosts } from '$lib/api';
	import Loading from '$lib/components/Loading/Loading.svelte';
	import { formatDate } from '$lib/utils';
	import { Paginator } from '@skeletonlabs/skeleton';
	import { createQuery } from '@tanstack/svelte-query';
	export let data;
	const { page } = data;
	$: settings = {
		page: page - 1 ?? 0,
		limit: 5,
		offset: 5,
		size,
		amounts: []
	};
	$: size = $query?.data?.totalPost;
	$: query = createQuery({
		queryKey: ['board', settings.page + 1],
		queryFn: () => getPosts(settings.page + 1),
		keepPreviousData: true,
		initialDataUpdatedAt: 0
	});
	let searchKeyword = '';

	function onPageChange(e) {
		goto(`/board?page=${e.detail + 1}`);
	}

	function onAmountChange(e) {
		goto(`/board?page=${e.detail + 1}`);
	}
	console.debug('aa', $query);
</script>

<main class="relative z-0">
	{#if $query.isPending || $query.isLoading}
		<Loading />
	{/if}
	<div class="table-container h-full pt-10 my-8 px-24 mx-auto flex flex-col gap-2 -z-1">
		<legend>{typeof data.page}: {data.page}</legend>
		<table class="table table-interactive">
			<thead>
				<tr>
					<th class="table-cell-fit text-center"> No </th>
					<th> 제목 </th>
					<th class="table-cell-fit text-center"> 작성자 </th>
					<th class="table-cell-fit text-center"> 작성일 </th>
					<th class="table-cell-fit text-center"> 조회수 </th>
				</tr>
			</thead>
			<tbody>
				{#if $query.isPending || $query.isLoading}
					{#each { length: 5 } as _, i}
						<tr id={`${_} ${i}`}>
							<td class="table-cell-fit text-center">
								<div class="placeholder animate-pulse w-3/4 inline-block" />
							</td>
							<td>
								<div class="placeholder animate-pulse w-2/4" />
							</td>
							<td class="table-cell-fit text-center">
								<div class="placeholder animate-pulse w-3/4 inline-block" />
							</td>
							<td class="table-cell-fit text-center">
								<div class="placeholder animate-pulse w-3/4 inline-block" />
							</td>
							<td class="table-cell-fit text-center">
								<div class="placeholder animate-pulse w-3/4 inline-block" />
							</td>
						</tr>
					{/each}
				{/if}

				{#if $query.isSuccess}
					{#each $query.data.item as post}
						<tr on:click={() => (window.location = `board/${post.id}`)}>
							<td class="table-cell-fit text-center"> {post.id} </td>
							<td>
								<span class="text-base">{post.title}</span>
								<span class="text-xs ml-1 text-primary-50">({post.commentCount})</span>
							</td>
							<td class="table-cell-fit text-center"> {post.author} </td>
							<td class="table-cell-fit text-center">
								{formatDate(post.createdAt)}
							</td>
							<td class="table-cell-fit text-center"> {post.views} </td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>

		<div class="pagination-container pt-8">
			<Paginator
				bind:settings
				maxNumerals={5}
				showNumerals
				justify={'justify-center'}
				on:page={onPageChange}
				on:amount={onAmountChange}
			/>
			<a
				href="/board/write"
				class="float-right btn variant-filled"
				data-sveltekit-preload-data="hover">글쓰기</a
			>
		</div>
		<form
			class="input-group input-group-divider grid-cols-[1fr_5fr_0.5fr] rounded-container-token mt-8 my-16"
		>
			<select class="select">
				<option value="1">전체</option>
				<option value="2">제목</option>
				<option value="3">내용</option>
				<option value="4">작성자</option>
				<option value="5">댓글</option>
			</select>
			<input
				bind:value={searchKeyword}
				class="bg-transparent border-0 ring-0"
				title="Input (search)"
				type="search"
			/>
			<button class="variant-filled-surface place-items-center"
				><span class="w-full">검색</span></button
			>
		</form>
	</div>
</main>

<style lang="scss">
	.skeleton {
		background: #e1e1e1;
		border-radius: 4px;
		height: 50px;
		position: relative;
		overflow: hidden;
	}

	.skeleton::before {
		content: '';
		display: block;
		position: absolute;
		left: -150px;
		top: 0;
		height: 100%;
		width: 150px;
		background: linear-gradient(to right, transparent 0%, #e8e8e8 50%, transparent 100%);
		animation: load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
	}

	@keyframes load {
		from {
			left: -150px;
		}
		to {
			left: 100%;
		}
	}
</style>
