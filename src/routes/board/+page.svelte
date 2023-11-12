<script>
	import { getPosts } from '$lib/api';
	import { formatDate } from '$lib/utils';
	import { Paginator } from '@skeletonlabs/skeleton';
	import { createQuery } from '@tanstack/svelte-query';

	$: settings = {
		page: 0,
		limit: 5,
		offset: 0,
		size: size,
		amounts: []
	};
	$: size = $query?.data.totalPost ?? 0;
	$: query = createQuery({
		queryKey: ['board', settings.page + 1],
		queryFn: () => getPosts(settings.page + 1),
		keepPreviousData: true,
		initialDataUpdatedAt: 0
	});

	function onPageChange(e) {
		console.log('event:page', e.detail);
	}

	function onAmountChange(e) {
		console.log('event:amount', e.detail);
	}
</script>

<div class="table-container h-full pt-10 my-8 px-24 mx-auto flex flex-col gap-2">
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
			{#if $query.isPending}
				{#each { length: 5 } as _, i}
					<tr>
						<td class="skeleton" colspan="5" id={(_, i)} />
					</tr>
				{/each}
			{/if}
			{#if $query.error}
				<tr
					><td class="table-cell-fit text-center" colspan="5"
						>An error has occurred: {$query.error.message}</td
					></tr
				>
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

	<div>
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
	<div class="grid grid-cols-2">
		<select class="select max-w-fit">
			<option value="1">전체</option>
			<option value="2">제목</option>
			<option value="3">내용</option>
			<option value="4">작성자</option>
			<option value="5">댓글</option>
		</select>
		<input class="input" title="Input (search)" type="search" />
	</div>
</div>

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
