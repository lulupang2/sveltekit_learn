import { notifyManager, QueryObserver } from "@tanstack/query-core";
import { r as readable, d as derived } from "./index.js";
import { g as getIsRestoringContext, u as useQueryClient } from "./useQueryClient.js";
import { i as isSvelteStore } from "./utils2.js";
import { p as get_store_value } from "./ssr.js";
import dayjs from "dayjs";
import "dayjs/locale/ko.js";
function useIsRestoring() {
  return getIsRestoringContext();
}
function createBaseQuery(options, Observer, queryClient) {
  const client = useQueryClient(queryClient);
  const isRestoring = useIsRestoring();
  const optionsStore = isSvelteStore(options) ? options : readable(options);
  const defaultedOptionsStore = derived([optionsStore, isRestoring], ([$optionsStore, $isRestoring]) => {
    const defaultedOptions = client.defaultQueryOptions($optionsStore);
    defaultedOptions._optimisticResults = $isRestoring ? "isRestoring" : "optimistic";
    return defaultedOptions;
  });
  const observer = new Observer(client, get_store_value(defaultedOptionsStore));
  defaultedOptionsStore.subscribe(($defaultedOptions) => {
    observer.setOptions($defaultedOptions, { listeners: false });
  });
  const result = derived(isRestoring, ($isRestoring, set) => {
    const unsubscribe = $isRestoring ? () => void 0 : observer.subscribe(notifyManager.batchCalls(set));
    observer.updateResult();
    return unsubscribe;
  });
  const { subscribe } = derived([result, defaultedOptionsStore], ([$result, $defaultedOptionsStore]) => {
    $result = observer.getOptimisticResult($defaultedOptionsStore);
    return !$defaultedOptionsStore.notifyOnChangeProps ? observer.trackResult($result) : $result;
  });
  return { subscribe };
}
function createQuery(options, queryClient) {
  return createBaseQuery(options, QueryObserver, queryClient);
}
dayjs.locale("ko");
function formatDate(date) {
  const today = dayjs();
  const inputDate = dayjs(date);
  if (inputDate.isSame(today, "day")) {
    return inputDate.format("HH:mm");
  } else {
    return inputDate.format("MM-DD");
  }
}
function postDate(date) {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
}
export {
  createQuery as c,
  formatDate as f,
  postDate as p
};
