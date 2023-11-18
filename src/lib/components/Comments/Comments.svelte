<script>
	import { formatDate } from '$lib/utils';
	import { tick } from 'svelte';
	import { writable } from 'svelte/store';
	import Comments from './Comments.svelte';
	import Comment from './Comment.svelte';
	export let comments;
	export let parentAuthor;
	export const selected = writable(2);
	let checked = false;

	async function showInputComment(id) {
		await tick();
		selected.set(id); // Update the store value
	}
</script>

{#if comments.parrentId === null && comments.length === 0}
	<p>댓글이 없습니다.</p>
{:else}
	{#each comments as comment}
		<div class="flex-col relative comments">
			<label>
				<div
					class="flex items-center space-x-6 py-2"
					on:click={() => showInputComment(comment.id)}
					on:keydown={() => showInputComment(comment.id)}
					role="button"
					tabindex="0"
				>
					<div class="flex-shrink-0">
						<span> ID : {comment.id}</span>
					</div>
					<div class="flex-shrink-0">
						<span> 작성자 : {comment.author}</span>
					</div>
					<div class="flex-1 min-w-0">
						<p class=" text-gray-900 truncate dark:text-white">
							{#if parentAuthor}<span class="text-gray-500 font-bold pr-4">{parentAuthor}</span
								>{/if}
							{comment.content}
						</p>
					</div>
					<div
						class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
					>
						{formatDate(comment.createdAt)}
					</div>
					<input type="checkbox" bind:checked class="hidden" />
					<!-- {#if $selected === comment.id}
						{comment.id}
					{/if} -->
				</div>
			</label>
			{#if $selected === comment.id && checked}
				<div class="comment-input">
					<Comment postId={comment.postId} parentId={$selected} />
				</div>
			{/if}
			{#if comment.children}
				<div class="flex-col indent">
					<Comments comments={comment.children} parentAuthor={comment.author} />
				</div>
			{/if}
		</div>
	{/each}
{/if}

<style lang="scss">
	.indent {
		margin-left: 20px;
	}
	.comment {
		&-input {
			// position: absolute;
			// inset: 0;
			// width: 100%;
		}
	}
</style>
