<script>
	import { formatDate } from '$lib/utils';

	export let comments;
	export function setRootComment(comments) {
		comments.parrentId = comments.id;
	}
</script>

<div class="mx-auto">
	{#if comments.length === 0}
		<p>댓글이 없습니다.</p>
	{:else}
		{#each comments as comment, i}
			<ul class=" divide-gray-200 dark:divide-gray-700">
				<li class="pb-3">
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
						<div
							class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
						>
							{formatDate(comment.createdAt)}
						</div>
					</div>
					<Comments />
				</li>
			</ul>
		{/each}
	{/if}
</div>
