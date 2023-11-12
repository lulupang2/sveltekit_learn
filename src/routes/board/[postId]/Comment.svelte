<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { createComment } from '$lib/api';
	import { createMutation, useQueryClient } from '@tanstack/svelte-query';

	export let postId;
	export let parentId = null;
	const client = useQueryClient();

	const form = { postId, parentId, author: '', content: '', password: '' };
	const addComment = (form) => {
		const res = createComment(postId, form);
		return res;
	};
	const mutation = createMutation({
		mutationFn: addComment,
		mutationKey: 'createComment',
		onSuccess: (data) => {
			client.setQueryData(['post', postId], (oldData) => {
				return {
					...oldData,
					comments: [...oldData.comments, data]
				};
			});
		},
		onSettled: () => {
			commentToast.trigger(sucssesToast);
		},
		onError: (error) => {
			commentToast.trigger(failToast);
			console.log('error', error);
		}
	});
	const sucssesToast = {
		message: '댓글이 등록되었습니다.',
		background: 'variant-filled-success',
		timeout: 5000
	};
	const failToast = {
		message: '댓글 등록에 실패했습니다.',
		background: 'variant-filled-warning',
		timeout: 5000
	};
	console.log('postId', postId);
</script>

<form on:submit={$mutation.mutate(form)}>
	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto_auto] my-4">
		<input
			type="text"
			class="px-4 input-group-shim"
			bind:value={form.author}
			placeholder="작성자"
			required
		/>
		<input
			class="px-4 input variant-form-material"
			bind:value={form.content}
			type="text"
			placeholder="내용"
			required
		/>
		<input
			type="password"
			class="px-4 input-group-shim"
			bind:value={form.password}
			placeholder="비밀번호"
			required
		/>
		<button type="submit" class="comment-submit-btn variant-filled-surface">등록</button>
	</div>
</form>

<style lang="scss">
	.comment {
		&-submit {
			&-btn {
				padding: 0.5rem 2rem;
				display: grid;
			}
		}
	}
</style>
