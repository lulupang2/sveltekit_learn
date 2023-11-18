import { dev } from '$app/environment';
import { PUBLIC_LOCAL_URL, PUBLIC_BASE_URL } from '$env/static/public';
import axios from 'axios';

const baseURL = dev ? PUBLIC_LOCAL_URL : `http://152.69.230.5:9999/api`;
export const api = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json'
	},
	timeout: 3000
});

api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response) {
			console.error(error.response.data);
			console.error(error.response.status);
			console.error(error.response.headers);
		} else if (error.request) {
			console.error(error.request);
		} else {
			console.error('Error', error.message);
		}
		return Promise.reject(error);
	}
);

export const getPosts = async (pageNum = 0) => {
	const { data } = await api.get(`/board?pageNum=${pageNum}`);

	return data;
};
export const getPost = async (id) => {
	const { data } = await api.get(`/board/${id}`);

	return data;
};

export async function createPost(newPost) {
	const { data } = await api.post(`/board`, newPost);

	return data;
}

export async function deletePost(id, password) {
	const { data } = await api.delete(`/board/${id}`, { data: { password } });

	return data;
}

export async function createComment(postId, body) {
	const { data } = await api.post(`/board/${postId}/comment`, body);

	return data;
}
