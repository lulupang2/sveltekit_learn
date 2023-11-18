<script>
	import { goto } from '$app/navigation';
	import { deletePost, getPost } from '$lib/api.js';
	import Comments from '$lib/components/Comments/Comments.svelte';
	import { postDate } from '$lib/utils';
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import { createMutation, createQuery } from '@tanstack/svelte-query';
	import Loading from '$lib/components/Loading/Loading.svelte';
	import Comment from '$lib/components/Comments/Comment.svelte';
	import PostSkeleton from './PostSkeleton.svelte';

	export let data;
	const { postId } = data;
	let password;
	const results = createQuery({
		queryKey: ['post', postId],
		queryFn: () => getPost(postId),
		retry: 2
	});
	//TODO: 삭제 모달 작업
	const dropPost = () => {
		const res = deletePost(postId, password);
		return res;
	};
	const mutation = createMutation({
		mutationFn: dropPost,
		mutationKey: 'deletePost',
		onSuccess: () => {
			goto('/board');
		},
		onSettled: () => {
			toast.trigger({
				message: '게시글이 삭제되었습니다.',
				background: 'variant-filled-success',
				timeout: 3000
			});
		},
		onError: (error) => {
			toast.trigger({
				message: `${error.response.data.message}`,
				background: 'variant-filled-warning',
				timeout: 3000,
				position: 't'
			});
			console.error('create comment error', error);
		}
	});

	const toast = getToastStore();
	const modal = getModalStore();

	const deletePostModal = {
		type: 'confirm',
		// Data
		title: '게시글 삭제',
		body: '게시글을 삭제하시겠습니까?',
		response: () => {
			$mutation.mutate();
		}
	};
</script>

{#if $results.isLoading || $results.isIdle || $results.isFetching}
	<Loading />
{/if}
<main class="post p-24 mx-auto">
	{#if $results.isLoading || $results.isIdle || $results.isFetching}
		<PostSkeleton />
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
		<div class="comment pt-8 border-t-2">
			<Comment {postId} />
		</div>
	{/if}
	<div class="post-btn-container flex justify-between pt-8">
		<a class="btn variant-filled" href="/board">목록</a>
		<div>
			<form>
				<div class="input-group input-group-divider grid-cols-[1fr_auto]">
					<input
						on:change={(e) => (password = e.target.value)}
						type="password"
						class="input pl-2"
						placeholder="비밀번호"
						autocomplete="off"
					/>

					<button
						on:click={() => modal.trigger(deletePostModal)}
						type="button"
						class="post-delete-btn btn variant-filled">삭제</button
					>
				</div>
			</form>
		</div>
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
		&-delete {
			&-btn {
				padding: 0.5rem 2rem;
			}
		}
	}
</style>
