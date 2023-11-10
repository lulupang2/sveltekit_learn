import { B as BROWSER } from "../../chunks/prod-ssr.js";
import { QueryClient } from "@tanstack/query-core";
const browser = BROWSER;
const load = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
        staleTime: 60 * 1e3
      }
    }
  });
  return { queryClient };
};
export {
  load
};
