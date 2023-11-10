import { c as create_ssr_component, h as createEventDispatcher, e as escape, k as each, b as add_attribute, v as validate_component, g as subscribe, n as noop } from "../../../chunks/ssr.js";
import { g as getPosts } from "../../../chunks/api.js";
import { c as createQuery, f as formatDate } from "../../../chunks/utils.js";
import "../../../chunks/useQueryClient.js";
const leftArrow = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>`;
const rightArrow = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>`;
const leftAngles = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"/></svg>`;
const rightAngles = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>`;
const cBase = "flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4";
const cLabel = "w-full md:w-auto";
const Paginator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let classesButtonActive;
  let classesBase;
  let classesLabel;
  let classesSelect;
  let classesControls;
  const dispatch = createEventDispatcher();
  let { settings = {
    page: 0,
    limit: 5,
    size: 0,
    amounts: [1, 2, 5, 10]
  } } = $$props;
  let { disabled = false } = $$props;
  let { showPreviousNextButtons = true } = $$props;
  let { showFirstLastButtons = false } = $$props;
  let { showNumerals = false } = $$props;
  let { maxNumerals = 1 } = $$props;
  let { justify = "justify-between" } = $$props;
  let { select = "select min-w-[150px]" } = $$props;
  let { amountText = "Items" } = $$props;
  let { regionControl = "btn-group" } = $$props;
  let { controlVariant = "variant-filled" } = $$props;
  let { controlSeparator = "" } = $$props;
  let { active = "variant-filled-primary" } = $$props;
  let { buttonClasses = "!px-3 !py-1.5 fill-current" } = $$props;
  let { buttonTextPrevious = leftArrow } = $$props;
  let { buttonTextNext = rightArrow } = $$props;
  let { buttonTextFirst = leftAngles } = $$props;
  let { buttonTextLast = rightAngles } = $$props;
  let { separatorText = "of" } = $$props;
  let { labelFirst = "First page" } = $$props;
  let { labelPrevious = "Previous page" } = $$props;
  let { labelNext = "Next page" } = $$props;
  let { labelLast = "Last page" } = $$props;
  let lastPage = Math.max(0, Math.ceil(settings.size / settings.limit - 1));
  let controlPages = getNumerals();
  function onChangeLength() {
    dispatch("amount", settings.limit);
    lastPage = Math.max(0, Math.ceil(settings.size / settings.limit - 1));
    if (settings.page > lastPage) {
      settings.page = lastPage;
    }
    controlPages = getNumerals();
  }
  function getFullNumerals() {
    const pages = [];
    for (let index = 0; index <= lastPage; index++) {
      pages.push(index);
    }
    return pages;
  }
  function getNumerals() {
    const pages = [];
    const isWithinLeftSection = settings.page < maxNumerals + 2;
    const isWithinRightSection = settings.page > lastPage - (maxNumerals + 2);
    if (lastPage <= maxNumerals * 2 + 1)
      return getFullNumerals();
    pages.push(0);
    if (!isWithinLeftSection)
      pages.push(-1);
    if (isWithinLeftSection || isWithinRightSection) {
      const sectionStart = isWithinLeftSection ? 1 : lastPage - (maxNumerals + 2);
      const sectionEnd = isWithinRightSection ? lastPage - 1 : maxNumerals + 2;
      for (let i = sectionStart; i <= sectionEnd; i++) {
        pages.push(i);
      }
    } else {
      for (let i = settings.page - maxNumerals; i <= settings.page + maxNumerals; i++) {
        pages.push(i);
      }
    }
    if (!isWithinRightSection)
      pages.push(-1);
    pages.push(lastPage);
    return pages;
  }
  function updateSize(size) {
    lastPage = Math.max(0, Math.ceil(size / settings.limit - 1));
    controlPages = getNumerals();
  }
  if ($$props.settings === void 0 && $$bindings.settings && settings !== void 0)
    $$bindings.settings(settings);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.showPreviousNextButtons === void 0 && $$bindings.showPreviousNextButtons && showPreviousNextButtons !== void 0)
    $$bindings.showPreviousNextButtons(showPreviousNextButtons);
  if ($$props.showFirstLastButtons === void 0 && $$bindings.showFirstLastButtons && showFirstLastButtons !== void 0)
    $$bindings.showFirstLastButtons(showFirstLastButtons);
  if ($$props.showNumerals === void 0 && $$bindings.showNumerals && showNumerals !== void 0)
    $$bindings.showNumerals(showNumerals);
  if ($$props.maxNumerals === void 0 && $$bindings.maxNumerals && maxNumerals !== void 0)
    $$bindings.maxNumerals(maxNumerals);
  if ($$props.justify === void 0 && $$bindings.justify && justify !== void 0)
    $$bindings.justify(justify);
  if ($$props.select === void 0 && $$bindings.select && select !== void 0)
    $$bindings.select(select);
  if ($$props.amountText === void 0 && $$bindings.amountText && amountText !== void 0)
    $$bindings.amountText(amountText);
  if ($$props.regionControl === void 0 && $$bindings.regionControl && regionControl !== void 0)
    $$bindings.regionControl(regionControl);
  if ($$props.controlVariant === void 0 && $$bindings.controlVariant && controlVariant !== void 0)
    $$bindings.controlVariant(controlVariant);
  if ($$props.controlSeparator === void 0 && $$bindings.controlSeparator && controlSeparator !== void 0)
    $$bindings.controlSeparator(controlSeparator);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.buttonClasses === void 0 && $$bindings.buttonClasses && buttonClasses !== void 0)
    $$bindings.buttonClasses(buttonClasses);
  if ($$props.buttonTextPrevious === void 0 && $$bindings.buttonTextPrevious && buttonTextPrevious !== void 0)
    $$bindings.buttonTextPrevious(buttonTextPrevious);
  if ($$props.buttonTextNext === void 0 && $$bindings.buttonTextNext && buttonTextNext !== void 0)
    $$bindings.buttonTextNext(buttonTextNext);
  if ($$props.buttonTextFirst === void 0 && $$bindings.buttonTextFirst && buttonTextFirst !== void 0)
    $$bindings.buttonTextFirst(buttonTextFirst);
  if ($$props.buttonTextLast === void 0 && $$bindings.buttonTextLast && buttonTextLast !== void 0)
    $$bindings.buttonTextLast(buttonTextLast);
  if ($$props.separatorText === void 0 && $$bindings.separatorText && separatorText !== void 0)
    $$bindings.separatorText(separatorText);
  if ($$props.labelFirst === void 0 && $$bindings.labelFirst && labelFirst !== void 0)
    $$bindings.labelFirst(labelFirst);
  if ($$props.labelPrevious === void 0 && $$bindings.labelPrevious && labelPrevious !== void 0)
    $$bindings.labelPrevious(labelPrevious);
  if ($$props.labelNext === void 0 && $$bindings.labelNext && labelNext !== void 0)
    $$bindings.labelNext(labelNext);
  if ($$props.labelLast === void 0 && $$bindings.labelLast && labelLast !== void 0)
    $$bindings.labelLast(labelLast);
  classesButtonActive = (page) => {
    return page === settings.page ? `${active} pointer-events-none` : "";
  };
  {
    onChangeLength();
  }
  {
    updateSize(settings.size);
  }
  classesBase = `${cBase} ${justify} ${$$props.class ?? ""}`;
  classesLabel = `${cLabel}`;
  classesSelect = `${select}`;
  classesControls = `${regionControl} ${controlVariant} ${controlSeparator}`;
  return `<div class="${"paginator " + escape(classesBase, true)}" data-testid="paginator"> ${settings.amounts.length ? `<label class="${"paginator-label " + escape(classesLabel, true)}"><select class="${"paginator-select " + escape(classesSelect, true)}" ${disabled ? "disabled" : ""} aria-label="Select Amount">${each(settings.amounts, (amount) => {
    return `<option${add_attribute("value", amount, 0)}>${escape(amount)} ${escape(amountText)}</option>`;
  })}</select></label>` : ``}  <div class="${"paginator-controls " + escape(classesControls, true)}"> ${showFirstLastButtons ? `<button type="button"${add_attribute("aria-label", labelFirst, 0)}${add_attribute("class", buttonClasses, 0)} ${disabled || settings.page === 0 ? "disabled" : ""}><!-- HTML_TAG_START -->${buttonTextFirst}<!-- HTML_TAG_END --></button>` : ``}  ${showPreviousNextButtons ? `<button type="button"${add_attribute("aria-label", labelPrevious, 0)}${add_attribute("class", buttonClasses, 0)} ${disabled || settings.page === 0 ? "disabled" : ""}><!-- HTML_TAG_START -->${buttonTextPrevious}<!-- HTML_TAG_END --></button>` : ``}  ${showNumerals === false ? ` <button type="button" class="${escape(buttonClasses, true) + " pointer-events-none !text-sm"}">${escape(settings.page * settings.limit + 1)}-${escape(Math.min(settings.page * settings.limit + settings.limit, settings.size))} <span class="opacity-50">${escape(separatorText)} ${escape(settings.size)}</span></button>` : ` ${each(controlPages, (page) => {
    return `<button type="button" class="${escape(buttonClasses, true) + " " + escape(classesButtonActive(page), true)}">${escape(page >= 0 ? page + 1 : "...")} </button>`;
  })}`}  ${showPreviousNextButtons ? `<button type="button"${add_attribute("aria-label", labelNext, 0)}${add_attribute("class", buttonClasses, 0)} ${disabled || (settings.page + 1) * settings.limit >= settings.size ? "disabled" : ""}><!-- HTML_TAG_START -->${buttonTextNext}<!-- HTML_TAG_END --></button>` : ``}  ${showFirstLastButtons ? `<button type="button"${add_attribute("aria-label", labelLast, 0)}${add_attribute("class", buttonClasses, 0)} ${disabled || (settings.page + 1) * settings.limit >= settings.size ? "disabled" : ""}><!-- HTML_TAG_START -->${buttonTextLast}<!-- HTML_TAG_END --></button>` : ``}</div></div>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: '.skeleton.svelte-lwhzj3{background:#e1e1e1;border-radius:4px;height:50px;position:relative;overflow:hidden}.skeleton.svelte-lwhzj3::before{content:"";display:block;position:absolute;left:-150px;top:0;height:100%;width:150px;background:linear-gradient(to right, transparent 0%, #e8e8e8 50%, transparent 100%);animation:svelte-lwhzj3-load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite}@keyframes svelte-lwhzj3-load{from{left:-150px}to{left:100%}}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let settings;
  let size;
  let query;
  let $query, $$unsubscribe_query = noop, $$subscribe_query = () => ($$unsubscribe_query(), $$unsubscribe_query = subscribe(query, ($$value) => $query = $$value), query);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    size = $query?.data.totalPost ?? 0;
    settings = {
      page: 0,
      limit: 5,
      offset: 0,
      size,
      amounts: []
    };
    $$subscribe_query(query = createQuery({
      queryKey: ["board", settings.page + 1],
      queryFn: () => getPosts(settings.page + 1),
      keepPreviousData: true,
      initialDataUpdatedAt: 0
    }));
    $$rendered = `<div class="table-container h-full pt-10 my-8 px-24 mx-auto flex flex-col gap-2"><table class="table table-interactive"><thead data-svelte-h="svelte-10xj44w"><tr><th class="table-cell-fit text-center">No</th> <th>제목</th> <th class="table-cell-fit text-center">작성자</th> <th class="table-cell-fit text-center">작성일</th> <th class="table-cell-fit text-center">조회수</th></tr></thead> <tbody>${$query.isPending ? `${each({ length: 5 }, (_, i) => {
      return `<tr data-svelte-h="svelte-rbrkd1"><td class="skeleton svelte-lwhzj3" colspan="5"${add_attribute("id", i, 0)}></td> </tr>`;
    })}` : ``} ${$query.error ? `<tr><td class="table-cell-fit text-center" colspan="5">An error has occurred: ${escape($query.error.message)}</td></tr>` : ``} ${$query.isSuccess ? `${each($query.data.item, (post) => {
      return `<tr><td class="table-cell-fit text-center">${escape(post.id)}</td> <td>${escape(post.title)}</td> <td class="table-cell-fit text-center">${escape(post.author)}</td> <td class="table-cell-fit text-center">${escape(formatDate(post.createdAt))}</td> <td class="table-cell-fit text-center">${escape(post.views)}</td> </tr>`;
    })}` : ``}</tbody></table> <div>${validate_component(Paginator, "Paginator").$$render(
      $$result,
      {
        maxNumerals: 5,
        showNumerals: true,
        justify: "justify-center",
        settings
      },
      {
        settings: ($$value) => {
          settings = $$value;
          $$settled = false;
        }
      },
      {}
    )} <a href="/board/write" class="float-right btn variant-filled" data-sveltekit-preload-data="hover" data-svelte-h="svelte-uifgye">글쓰기</a></div> <div class="grid grid-cols-2"><select class="select max-w-fit"><option value="1" data-svelte-h="svelte-slq1if">전체</option><option value="2" data-svelte-h="svelte-h0b7hx">제목</option><option value="3" data-svelte-h="svelte-w4by42">내용</option><option value="4" data-svelte-h="svelte-16tx5i0">작성자</option><option value="5" data-svelte-h="svelte-16jx398">댓글</option></select> <input class="input" title="Input (search)" type="search"></div> </div>`;
  } while (!$$settled);
  $$unsubscribe_query();
  return $$rendered;
});
export {
  Page as default
};
