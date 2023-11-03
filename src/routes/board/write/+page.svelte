<script>
	import Tiptap from '$lib/components/Editor/Tiptap.svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { onDestroy, onMount } from 'svelte';

	const onSubmit = (e) => {
		e.preventDefault();
		console.log(editor.getHTML());
	};
	let author;
	let password;
	let title;
	let editor;
	let element;

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
</script>

<div class="form px-8 my-8">
	<form on:submit|preventDefault={onSubmit}>
		<div class="-mx-3 md:flex mb-6">
			<div class="md:w-1/6 px-3 mb-6 md:mb-0">
				<input
					class="input appearance-none outline-none block w-full py-3 px-4 cursor-pointer focus:outline-none"
					title="author"
					type="text"
					autocomplete="username"
					placeholder="작성자"
					bind:value={author}
				/>
			</div>
			<div class="md:w-1/8 px-3">
				<input
					class="input appearance-none outline-none block w-full py-3 px-4 cursor-pointer focus:outline-none"
					title="password"
					type="password"
					autocomplete="current-password"
					placeholder="비밀번호"
					bind:value={password}
				/>
			</div>
		</div>
		<div class="-mx-3 md:flex mb-6 px-3">
			<input
				type="text"
				class="input appearance-none outline-none block w-full py-3 px-4 cursor-pointer focus:outline-none"
				title="title"
				placeholder="제목"
				bind:value={title}
			/>
		</div>

		<Tiptap element {editor} />
		<div bind:this={element} />
		<button type="submit">Submit</button>
	</form>
</div>
