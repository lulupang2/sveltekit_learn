import { goto } from '$app/navigation';
import { getPosts } from '$lib/api.js';
export const prerender = false;
export const load = async ({ url }) => {
	// const { queryClient } = await parent();
	const page = Number(url.searchParams.get('page'));
	const search = url.searchParams.get('search') ?? '';
	const type = url.searchParams.get('type') ?? 'all';

	// const initialData = await queryClient.prefetchQuery({
	// 	queryKey: ['board', Number(page), type ?? 'type', search ?? 'search'],
	// 	queryFn: () => (keyword ? getPosts(page, type, search) : getPosts(page))
	// });
	// return { page, search, type, initialData };
	const initialData = await getPosts(page, type, search);
	return { initialData, page, search, type };
};
