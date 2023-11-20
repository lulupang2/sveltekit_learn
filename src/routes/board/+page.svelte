<script>
	import { goto } from '$app/navigation';
	import { getPosts } from '$lib/api';
	import Loading from '$lib/components/Loading/Loading.svelte';
	import { formatDate } from '$lib/utils';
	import { Paginator } from '@skeletonlabs/skeleton';
	import { createQuery } from '@tanstack/svelte-query';

	export let data;

	$: typeSelect = 'all';
	$: searchKeyword = '';
	$: currntPage = data.page;
	$: size = $query?.data?.totalPost || 0;

	$: query = createQuery({
		queryKey: ['board', settings.page + 1, data.type, data.search],
		queryFn: () => getPosts(settings.page + 1, data.type, data.search),
		keepPreviousData: true,
		initialData: data.initialData
	});

	$: settings = {
		page: currntPage - 1,
		limit: 5,
		offset: 5,
		size,
		amounts: []
	};
	function onPageChange(e) {
		goto(`/board?page=${e.detail + 1}&type=${typeSelect}&search=${searchKeyword}`);
	}

	function onAmountChange(e) {
		goto(`/board?page=${e.detail + 1}&type=${typeSelect}&search=${searchKeyword}`);
		// data.search
		// 	? goto(`/board?page=${e.detail + 1}&type=${typeSelect}&search=${searchKeyword}`)
		// 	: goto(`/board?page=${e.detail + 1}`);
	}
	const onSearchChange = (e) => (searchKeyword = e.target.value);
	const searchHandler = async () => {
		console.log('searchHandler', searchKeyword);
		await goto(`/board?page=${1}&type=${typeSelect}&search=${searchKeyword}`);
	};
</script>

<main class="relative z-0">
	{#if $query.isLoading}
		<Loading />
	{/if}

	<div class="table-container h-full pt-10 my-8 px-24 mx-auto flex flex-col gap-2 -z-1">
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
				{#if $query.error}
					<tr>
						<td class="text-center" colspan="5">
							<div class=" w-full grid place-content-center h-48">검색 결과가 없습니다.</div>
						</td>
					</tr>
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
				showNumerals
				showFirstLastButtons
				controlVariant={'variant-filled-surface'}
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

		<div
			class="input-group input-group-divider grid-cols-[0.5fr_5fr_0.5fr] rounded-container-token mt-8 my-16"
		>
			<select class="select" bind:value={typeSelect} disabled>
				<option value="all">전체</option>
				<option value="title">제목</option>
				<option value="content">내용</option>
				<option value="author">작성자</option>
			</select>
			<input
				on:input={(e) => (searchKeyword = e.target.value)}
				on:keydown={(e) => e.key === 'Enter' && searchHandler()}
				class="bg-transparent border-0 ring-0 pl-4"
				title="Input (search)"
				type="search"
			/>
			<button class="variant-filled-surface place-items-center" on:click={searchHandler}
				><span class="w-full">검색</span></button
			>
		</div>
	</div>
</main>
