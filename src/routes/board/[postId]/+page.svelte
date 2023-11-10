<script>
	import { goto } from '$app/navigation';
	import { deletePost, getPost } from '$lib/api.js';
	import Comments from '$lib/components/Comments/Comments.svelte';
	import { postDate } from '$lib/utils';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { createMutation, createQuery } from '@tanstack/svelte-query';

	export let data;
	const { postId } = data;
	const results = createQuery({
		queryKey: ['post', postId],
		queryFn: () => getPost(postId),
		retry: 2
	});
	//TODO: 삭제 모달 작업
	const mutation = (passwd) =>
		createMutation({
			mutationFn: deletePost(postId, passwd),
			mutationKey: 'deletePost',
			onSuccess: () => {
				goto('/board');
			},
			onError: (error) => {
				toast.trigger(failToast);
				console.log('에러', error);
			}
		});

	const failToast = {
		message: '비밀번호가 일치하지 않습니다.',
		background: 'variant-filled-warning',
		timeout: 3000,
		position: 't'
	};
	const toast = getToastStore();
	const modal = getModalStore();
</script>

<main class="post p-24 mx-auto">
	{#if !postId || $results.isLoading}
		<span>Loading...</span>
	{/if}
	{#if $results.error}
		<span>Error: {goto('/board')}</span>
	{/if}
	{#if $results.isSuccess}
		<div class="post-header pt-8">
			<h1>{$results.data.post.title}</h1>
			<div class="post-info pt-4 flex gap-2">
				<span class="post-info-author">{$results.data.post.author}</span>
				<span class="post-info-date flex-1">{postDate($results.data.post.createdAt)}</span>
				<span class="post-info-views mr-40">조회 {$results.data.post.views}</span>
			</div>
		</div>
		<div class="content pt-12">
			{@html $results.data.post.content}
		</div>
		<div class="comments pt-8">
			<span>댓글 ({$results.data.commentSize})</span>
			<Comments comments={$results.data.comments} />
		</div>
	{/if}
	<div class="post-btn-container flex justify-between pt-8">
		<a class="btn variant-filled" href="/board">목록</a>
		<button on:click={() => modal.trigger(deleteModal)} type="button" class="btn variant-filled"
			>삭제</button
		>
	</div>
	{#if $modal[0]}
		<div />
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
