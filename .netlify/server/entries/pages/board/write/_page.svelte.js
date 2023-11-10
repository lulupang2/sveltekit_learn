import { p as get_store_value, c as create_ssr_component, b as add_attribute, k as each, v as validate_component, o as onDestroy, g as subscribe } from "../../../../chunks/ssr.js";
import { g as goto } from "../../../../chunks/navigation.js";
import { c as createPost } from "../../../../chunks/api.js";
import "@tiptap/starter-kit";
import "@tiptap/extension-image";
import "@tiptap/extension-placeholder";
import { g as getToastStore } from "../../../../chunks/stores2.js";
import { u as useQueryClient } from "../../../../chunks/useQueryClient.js";
import { r as readable, d as derived } from "../../../../chunks/index.js";
import { MutationObserver, notifyManager } from "@tanstack/query-core";
import { i as isSvelteStore } from "../../../../chunks/utils2.js";
function createMutation(options, queryClient) {
  const client = useQueryClient(queryClient);
  const optionsStore = isSvelteStore(options) ? options : readable(options);
  const observer = new MutationObserver(client, get_store_value(optionsStore));
  let mutate;
  optionsStore.subscribe(($options) => {
    mutate = (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    };
    observer.setOptions($options);
  });
  const result = readable(observer.getCurrentResult(), (set) => {
    return observer.subscribe(notifyManager.batchCalls((val) => set(val)));
  });
  const { subscribe: subscribe2 } = derived(result, ($result) => ({
    ...$result,
    mutate,
    mutateAsync: $result.mutate
  }));
  return { subscribe: subscribe2 };
}
function noop() {
}
const remixiconUrl = "/_app/immutable/assets/remixicon.symbol.a8df2680.svg";
const MenuItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { isActive } = $$props;
  let { icon } = $$props;
  let { action } = $$props;
  let { title } = $$props;
  if ($$props.isActive === void 0 && $$bindings.isActive && isActive !== void 0)
    $$bindings.isActive(isActive);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.action === void 0 && $$bindings.action && action !== void 0)
    $$bindings.action(action);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  return `<div><button${add_attribute("class", `menu-item${isActive && isActive() ? " is-active" : ""}`, 0)}${add_attribute("title", title, 0)}><svg class="remix"><use${add_attribute("xlink:href", `${remixiconUrl}#ri-${icon}`, 0)}></use></svg></button></div>`;
});
const MenuBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { editor } = $$props;
  const items = [
    {
      icon: "bold",
      title: "Bold",
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive("bold")
    },
    {
      icon: "italic",
      title: "Italic",
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive("italic")
    },
    {
      icon: "strikethrough",
      title: "Strike",
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive("strike")
    },
    {
      icon: "code-view",
      title: "Code",
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: () => editor.isActive("code")
    },
    {
      icon: "mark-pen-line",
      title: "Highlight",
      action: () => editor.chain().focus().toggleHighlight().run(),
      isActive: () => editor.isActive("highlight")
    },
    { type: "divider" },
    {
      icon: "h-1",
      title: "Heading 1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 })
    },
    {
      icon: "h-2",
      title: "Heading 2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 })
    },
    {
      icon: "paragraph",
      title: "Paragraph",
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: () => editor.isActive("paragraph")
    },
    {
      icon: "list-unordered",
      title: "Bullet List",
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList")
    },
    {
      icon: "list-ordered",
      title: "Ordered List",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList")
    },
    {
      icon: "list-check-2",
      title: "Task List",
      action: () => editor.chain().focus().toggleTaskList().run(),
      isActive: () => editor.isActive("taskList")
    },
    {
      icon: "code-box-line",
      title: "Code Block",
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive("codeBlock")
    },
    { type: "divider" },
    {
      icon: "double-quotes-l",
      title: "Blockquote",
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive("blockquote")
    },
    {
      icon: "separator",
      title: "Horizontal Rule",
      action: () => editor.chain().focus().setHorizontalRule().run()
    },
    { type: "divider" },
    {
      icon: "text-wrap",
      title: "Hard Break",
      action: () => editor.chain().focus().setHardBreak().run()
    },
    {
      icon: "format-clear",
      title: "Clear Format",
      action: () => editor.chain().focus().clearNodes().unsetAllMarks().run()
    },
    { type: "divider" },
    {
      icon: "arrow-go-back-line",
      title: "Undo",
      action: () => editor.chain().focus().undo().run()
    },
    {
      icon: "arrow-go-forward-line",
      title: "Redo",
      action: () => editor.chain().focus().redo().run()
    }
  ];
  if ($$props.editor === void 0 && $$bindings.editor && editor !== void 0)
    $$bindings.editor(editor);
  return `<div${add_attribute("class", "editor__header", 0)}>${each(items, (item) => {
    return `${item.type === "divider" ? `<div class="divider"></div>` : `${validate_component(MenuItem, "MenuItem").$$render($$result, Object.assign({}, item), {}, {})}`}`;
  })}</div>`;
});
const styles = "";
const Tiptap = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { editor } = $$props;
  let element;
  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });
  if ($$props.editor === void 0 && $$bindings.editor && editor !== void 0)
    $$bindings.editor(editor);
  return `${editor ? `${validate_component(MenuBar, "MenuBar").$$render($$result, { editor }, {}, {})}` : ``} <div${add_attribute("this", element, 0)}></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_mutation;
  let editor;
  const client = useQueryClient();
  const toast = getToastStore();
  const successToast = {
    message: "게시글이 등록되었습니다.",
    background: "variant-filled-success",
    timeout: 3e3,
    position: "t"
  };
  let form = {
    author: "",
    password: "",
    title: "",
    content: ""
  };
  const addPost = async (form2) => {
    if (!form2.author || !form2.password || !form2.title || !form2.content) {
      alert("빈칸을 모두 채워주세요.");
      console.log("form", form2);
      return;
    }
    const res = await createPost(form2);
    return res;
  };
  const mutation = createMutation({
    mutationFn: addPost,
    mutationKey: "createPost",
    onSuccess: (data) => {
      client.invalidateQueries({ queryKey: ["post", data.id] });
      toast.trigger(successToast);
      console.log("dd", data);
      goto(`/board/${data.id}`);
    },
    onError: (error) => {
      console.log("error", error);
    }
  });
  $$unsubscribe_mutation = subscribe(mutation, (value) => value);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="form px-8 my-8"><form><div class="-mx-3 md:flex mb-6"><div class="md:w-1/6 px-3 mb-6 md:mb-0"><input class="input appearance-none outline-none block w-full py-3 px-4 cursor-pointer focus:outline-none" title="author" type="text" autocomplete="off" placeholder="작성자"${add_attribute("value", form.author, 0)}></div> <div class="md:w-1/8 px-3"><input class="input appearance-none outline-none block w-full py-3 px-4 cursor-pointer focus:outline-none" title="password" type="password" autocomplete="off" placeholder="비밀번호"${add_attribute("value", form.password, 0)}></div></div> <div class="-mx-3 md:flex mb-6 px-3"><input type="text" class="input appearance-none outline-none block w-full py-3 px-4 cursor-pointer focus:outline-none" title="title" placeholder="제목"${add_attribute("value", form.title, 0)}></div> ${validate_component(Tiptap, "Tiptap").$$render(
      $$result,
      { editor },
      {
        editor: ($$value) => {
          editor = $$value;
          $$settled = false;
        }
      },
      {}
    )} <div class="flex justify-between pt-8"><input type="file" name="imgFile" id="imgFile" class="hidden" accept="image/*"> <label for="imgFile" class="btn variant-filled w-24" data-svelte-h="svelte-1686kni">이미지</label> <button type="submit" class="btn variant-filled w-24" data-svelte-h="svelte-mb5lrh">저장</button></div></form></div>`;
  } while (!$$settled);
  $$unsubscribe_mutation();
  return $$rendered;
});
export {
  Page as default
};
