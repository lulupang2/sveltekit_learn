import { getPosts } from '$lib/api.js';
export const prerender = false;
export const load = async ({ parent, url }) => {
	const { queryClient } = await parent();
	const page = Number(url.searchParams.get('page')) || 1;
	const type = url.searchParams.get('type');

	const initialData = await queryClient.prefetchQuery({
		queryKey: ['board', Number(page)],
		queryFn: () => getPosts(page, type)
	});
	return { page, initialData };
};
