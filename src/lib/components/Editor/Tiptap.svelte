<script>
	import { Editor } from '@tiptap/core';
	import MenuBar from './MenuBar.svelte';
	import './styles.scss';
	import StarterKit from '@tiptap/starter-kit';
	import { Image } from '@tiptap/extension-image';
	import Placeholder from '@tiptap/extension-placeholder';
	import { onDestroy, onMount } from 'svelte';

	export let editor;
	let element;
	onMount(() => {
		editor = new Editor({
			element,
			extensions: [
				StarterKit,
				Image.configure({
					inline: true,
					allowBase64: true
				}),
				Placeholder.configure({
					placeholder: '내용을 입력해주세요.'
				})
			],
			content: '',
			editorProps: {
				attributes: {
					class: 'editor textarea border border-primary-100 p-3 outline-none '
				},
				handlePaste: onPasteHandler(editor)
			},
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				editor = editor;
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
	function onPasteHandler(editor) {
		return (event, view, slice) => {
			const item = event.clipboardData?.items[0];

			if (item?.type.indexOf('image') !== 0) {
				return false;
			}

			const file = item.getAsFile();
			let filesize = (file.size / 1024 / 1024).toFixed(4);

			if (filesize > 10) {
				window.alert(`too large image! filesize: ${filesize} mb`);
				return false;
			}

			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (e) => {
				editor.commands.setImage({ src: e.target.result });
			};

			return true;
		};
	}
</script>

{#if editor}
	<MenuBar {editor} />
{/if}
<div bind:this={element} />
