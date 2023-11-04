<script>
	import { getPost } from '$lib/api.js';
	import { postDate } from '$lib/utils';
	import { createQuery } from '@tanstack/svelte-query';
	export let data;
	const { postId } = data;
	const post = createQuery({
		queryKey: ['post', postId],
		queryFn: () => getPost(postId)
	});
</script>

<main class="post p-24 mx-auto">
	{#if !postId || $post.isLoading}
		<span>Loading...</span>
	{/if}
	{#if $post.error}
		<span>Error: {$post.error.message}</span>
	{/if}
	{#if $post.isSuccess}
		<div class="post-header pt-8">
			<h1>{$post.data.title}</h1>
			<div class="post-info pt-4 flex gap-2">
				<span class="post-info-author">{$post.data.author}</span>
				<span class="post-info-date flex-1">{postDate($post.data.createdAt)}</span>
				<span class="post-info-views mr-40">조회 {$post.data.views}</span>
			</div>
		</div>
		<div class="content pt-12">
			{@html $post.data.content}
		</div>
		<div class="comments pt-8">
			<h2>댓글</h2>
		</div>
	{/if}
</main>

<style lang="scss">
	.post {
		&-info {
			&-date {
				&::before {
					content: '';
					display: inline-block;
					width: 1px;
					height: 12px;
					background: #ccc;
					margin: 0 10px 0 6px;
					vertical-align: -2px;
				}
			}
		}
	}
</style>
