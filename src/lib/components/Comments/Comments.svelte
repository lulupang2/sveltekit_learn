<script>
	import { formatDate } from '$lib/utils';
	import Comments from './Comments.svelte';

	export let comments;
</script>

{#if comments.parrentId === null && comments.length === 0}
	<p>댓글이 없습니다.</p>
{:else}
	{#each comments as comment}
		<div class="flex items-center space-x-4">
			<div class="flex-shrink-0">
				<span> ID : {comment.id}</span>
			</div>
			<div class="flex-shrink-0">
				<span> 작성자 : {comment.author}</span>
			</div>
			<div class="flex-1 min-w-0">
				<p class=" text-gray-900 truncate dark:text-white">
					{comment.content}
				</p>
			</div>
			<div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
				{formatDate(comment.createdAt)}
			</div>
		</div>
		{#if comment.children}
			<div class="indent">
				<Comments comments={comment.children} />
			</div>
		{/if}
	{/each}
{/if}

<style>
	.indent {
		margin-left: 20px;
	}
</style>
