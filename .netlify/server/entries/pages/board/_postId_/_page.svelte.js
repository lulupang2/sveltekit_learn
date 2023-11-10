import { c as create_ssr_component, k as each, e as escape, v as validate_component, g as subscribe } from "../../../../chunks/ssr.js";
import { g as goto } from "../../../../chunks/navigation.js";
import { a as getPost } from "../../../../chunks/api.js";
import { f as formatDate, c as createQuery, p as postDate } from "../../../../chunks/utils.js";
import { g as getModalStore } from "../../../../chunks/stores.js";
import "../../../../chunks/useQueryClient.js";
const Comments_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".indent.svelte-1du9oos{margin-left:20px}",
  map: null
};
const Comments_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { comments } = $$props;
  if ($$props.comments === void 0 && $$bindings.comments && comments !== void 0)
    $$bindings.comments(comments);
  $$result.css.add(css$1);
  return `${comments.parrentId === null && comments.length === 0 ? `<p data-svelte-h="svelte-1k02qz4">댓글이 없습니다.</p>` : `${each(comments, (comment) => {
    return `<div class="flex items-center space-x-4"><div class="flex-shrink-0"><span>ID : ${escape(comment.id)}</span></div> <div class="flex-shrink-0"><span>작성자 : ${escape(comment.author)}</span></div> <div class="flex-1 min-w-0"><p class="text-gray-900 truncate dark:text-white">${escape(comment.content)} </p></div> <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">${escape(formatDate(comment.createdAt))} </div></div> ${comment.children ? `<div class="indent svelte-1du9oos">${validate_component(Comments_1, "Comments").$$render($$result, { comments: comment.children }, {}, {})} </div>` : ``}`;
  })}`}`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: '.post-info-date.svelte-158zliu::before{content:"";display:inline-block;width:1px;height:12px;background:#ccc;margin:0 10px 0 6px;vertical-align:-2px}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $results, $$unsubscribe_results;
  let $modal, $$unsubscribe_modal;
  let { data } = $$props;
  const { postId } = data;
  const results = createQuery({
    queryKey: ["post", postId],
    queryFn: () => getPost(postId),
    retry: 2
  });
  $$unsubscribe_results = subscribe(results, (value) => $results = value);
  const modal = getModalStore();
  $$unsubscribe_modal = subscribe(modal, (value) => $modal = value);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  $$unsubscribe_results();
  $$unsubscribe_modal();
  return `<main class="post p-24 mx-auto">${!postId || $results.isLoading ? `<span data-svelte-h="svelte-omrbt4">Loading...</span>` : ``} ${$results.error ? `<span>Error: ${escape(goto("/board"))}</span>` : ``} ${$results.isSuccess ? `<div class="post-header pt-8"><h1>${escape($results.data.post.title)}</h1> <div class="post-info pt-4 flex gap-2"><span class="post-info-author">${escape($results.data.post.author)}</span> <span class="post-info-date flex-1 svelte-158zliu">${escape(postDate($results.data.post.createdAt))}</span> <span class="post-info-views mr-40">조회 ${escape($results.data.post.views)}</span></div></div> <div class="content pt-12"><!-- HTML_TAG_START -->${$results.data.post.content}<!-- HTML_TAG_END --></div> <div class="comments pt-8"><span>댓글 (${escape($results.data.commentSize)})</span> ${validate_component(Comments_1, "Comments").$$render($$result, { comments: $results.data.comments }, {}, {})}</div>` : ``} <div class="post-btn-container flex justify-between pt-8" data-svelte-h="svelte-15bwoyx"><a class="btn variant-filled" href="/board">목록</a> </div> ${$modal[0] ? `<div></div>` : ``} </main>`;
});
export {
  Page as default
};
