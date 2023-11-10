import { getPosts } from '$lib/api.js';
export const prerender = false;
export const load = async ({ parent }) => {
	const { queryClient } = await parent();

	// You need to use the SvelteKit fetch function here
	await queryClient.prefetchQuery({
		queryKey: ['board', 1],
		queryFn: () => getPosts(1)
	});
};

// export const load = async ({ parent, fetch }) => {
// 	const result = [];
// 	try {
// 		const res = await fetch('http://localhost:3000/board');
// 		const list = await res.json();
// 		dayjs.extend(utc);
// 		dayjs.extend(timezone);
// 		dayjs.tz.setDefault('Asia/Seoul');
// 		const nowDate = dayjs().format('YYYY-MM-DD');
// 		list.map((item) => {
// 			result.push({
// 				id: item.id,
// 				title: item.title,
// 				author: item.author,
// 				date:
// 					nowDate === dayjs(item.createdAt).format('YYYY-MM-DD')
// 						? dayjs.tz(item.createdAt).format('HH:mm')
// 						: dayjs.tz(item.createdAt).format('MM-DD'),
// 				views: item.views
// 			});
// 		});
// 	} catch (e) {
// 		console.error(e.message);
// 	}
// 	return { result: result.reverse() };
// };
