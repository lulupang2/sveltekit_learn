<script>
	import { goto } from '$app/navigation';
	import { createPost } from '$lib/api';
	import Tiptap from '$lib/components/Editor/Tiptap.svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { createMutation, useQueryClient } from '@tanstack/svelte-query';

	let editor;
	let imgFile;
	const client = useQueryClient();
	const toast = getToastStore();
	const successToast = {
		message: '게시글이 등록되었습니다.',
		background: 'variant-filled-success',
		timeout: 3000,
		position: 't'
	};

	let form = { author: '', password: '', title: '', content: '' };
	const onImageUpload = (e) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			editor.commands.setImage({ src: e.target.result });
			imgFile.value = '';
		};
	};
	const addPost = async (form) => {
		if (!form.author || !form.password || !form.title || !form.content) {
			alert('빈칸을 모두 채워주세요.');
			console.log('form', form);
			return;
		}
		const res = await createPost(form);
		return res;
	};
	const mutation = createMutation({
		mutationFn: addPost,
		mutationKey: 'createPost',
		onSuccess: (data) => {
			client.invalidateQueries({
				queryKey: ['post', data.id]
			});
			toast.trigger(successToast);
			console.log('dd', data);
			goto(`/board/${data.id}`);
		},
		onError: (error) => {
			console.log('error', error);
		}
	});
</script>

<div class="form px-8 my-8">
	{#if $mutation.isPending}
		<!-- loading spiner -->
		<div class="flex items-center justify-center w-full h-full">
			<div class="flex justify-center items-center space-x-1 text-sm text-gray-700">
				<svg
					fill="none"
					class="w-6 h-6 animate-spin"
					viewBox="0 0 32 32"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						clip-rule="evenodd"
						d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
						fill="currentColor"
						fill-rule="evenodd"
					/>
				</svg>

				<div>Loading ...</div>
			</div>
		</div>
	{/if}

	<form
		on:submit={(e) => {
			e.preventDefault();
			e.stopPropagation();
			form.content = editor.getHTML();
			$mutation.mutate(form);
		}}
	>
		<div class="-mx-3 md:flex mb-6">
			<div class="md:w-1/6 px-3 mb-6 md:mb-0">
				<input
					class="input appearance-none outline-none block w-full py-3 px-4 cursor-pointer focus:outline-none"
					title="author"
					type="text"
					autocomplete="off"
					placeholder="작성자"
					bind:value={form.author}
				/>
			</div>
			<div class="md:w-1/8 px-3">
				<input
					class="input appearance-none outline-none block w-full py-3 px-4 cursor-pointer focus:outline-none"
					title="password"
					type="password"
					autocomplete="off"
					placeholder="비밀번호"
					bind:value={form.password}
				/>
			</div>
		</div>
		<div class="-mx-3 md:flex mb-6 px-3">
			<input
				type="text"
				class="input appearance-none outline-none block w-full py-3 px-4 cursor-pointer focus:outline-none"
				title="title"
				placeholder="제목"
				bind:value={form.title}
			/>
		</div>

		<Tiptap bind:editor />
		<div class="flex justify-between pt-8">
			<input
				type="file"
				name="imgFile"
				id="imgFile"
				class="hidden"
				accept="image/*"
				bind:this={imgFile}
				on:change={onImageUpload}
			/>
			<label for="imgFile" class="btn variant-filled w-24"> 이미지 </label>
			<button type="submit" class="btn variant-filled w-24">저장</button>
		</div>
	</form>
</div>
