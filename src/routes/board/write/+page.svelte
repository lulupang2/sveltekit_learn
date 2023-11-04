<script>
	import { createPost } from '$lib/api';
	import Tiptap from '$lib/components/Editor/Tiptap.svelte';
	import { createMutation, useQueryClient } from '@tanstack/svelte-query';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { onDestroy, onMount } from 'svelte';

	let editor;
	let element;
	const client = useQueryClient();

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit],
			content: '<p>Hello World! 🌎️</p>',
			editorProps: {
				attributes: {
					class: 'editor textarea border border-primary-100 p-3 outline-none '
				}
			},
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});
		console.log('editor', editor);
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
	let form = { author: '', password: '', title: '', content: '' };
	const addPost = async (form) => {
		const res = await createPost(form);
		console.log('res', res);
	};
	const mutation = createMutation({
		mutationFn: addPost,
		mutationKey: 'createPost',
		onSuccess: (data) => {
			client.invalidateQueries({
				queryKey: ['board', data]
			});
		},
		onError: (error) => {
			console.log('error', error);
		}
	});
</script>

<div class="form px-8 my-8">
	<form
		on:submit={(e) => {
			e.preventDefault();
			e.stopPropagation();
			form.content = editor.getHTML(); // 에디터의 내용을 form.content에 설정합니다.
			$mutation.mutate(form); // form 객체를 mutate 함수에 전달합니다.
		}}
	>
		<div class="-mx-3 md:flex mb-6">
			<div class="md:w-1/6 px-3 mb-6 md:mb-0">
				<input
					class="input appearance-none outline-none block w-full py-3 px-4 cursor-pointer focus:outline-none"
					title="author"
					type="text"
					autocomplete="username"
					placeholder="작성자"
					bind:value={form.author}
				/>
			</div>
			<div class="md:w-1/8 px-3">
				<input
					class="input appearance-none outline-none block w-full py-3 px-4 cursor-pointer focus:outline-none"
					title="password"
					type="password"
					autocomplete="current-password"
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

		<Tiptap element {editor} />
		<div bind:this={element} />
		<button type="submit">Submit</button>
	</form>
</div>
