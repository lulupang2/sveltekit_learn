import { g as getPosts } from "../../../chunks/api.js";
const prerender = false;
const load = async ({ parent }) => {
  const { queryClient } = await parent();
  await queryClient.prefetchQuery({
    queryKey: ["board", 1],
    queryFn: () => getPosts(1)
  });
};
export {
  load,
  prerender
};
