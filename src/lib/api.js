import { PUBLIC_BASE_URL } from '$env/static/public';
import axios from 'axios';

export const api = axios.create({
	baseURL: PUBLIC_BASE_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	timeout: 3000
});

export const getPosts = async (pageNum = 0) => {
	const { data } = await api.get(`/board?pageNum=${pageNum}`);

	return data;
};
export const getPost = async (id) => {
	const { data } = await api.get(`/board/${id}`);

	return data;
};

export async function createPost(newPost) {
	// API 호출을 수행하고 결과를 반환합니다.
	const { data } = await api.post(`/board`, newPost);

	return data;
}
