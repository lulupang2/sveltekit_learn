import { getPosts } from '$lib/api.js';
export const prerender = false;
export const load = async ({ parent }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['board', 1],
		queryFn: () => getPosts(1)
	});
};
