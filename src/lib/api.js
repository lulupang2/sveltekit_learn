export const getPosts = async (pageNum = 0) => {
	const res = await fetch(`http://localhost:3000/board?pageNum=${pageNum}`);
	const data = await res.json();
	return data;
};
