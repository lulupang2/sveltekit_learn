import { PUBLIC_BASE_URL, PUBLIC_LOCAL_URL } from '$env/static/public';
import axios from 'axios';
const baseURL =
	process.env.NODE_ENV === `production`
		? `http://152.69.230.5:9999/api`
		: process.env.NODE_ENV === `development`
		? PUBLIC_LOCAL_URL
		: PUBLIC_BASE_URL;
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
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			console.log(error.response.data);
			console.log(error.response.status);
			console.log(error.response.headers);
		} else if (error.request) {
			// The request was made but no response was received
			console.log(error.request);
		} else {
			// Something happened in setting up the request that triggered an Error
			console.log('Error', error.message);
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

export async function deletePost(id, passwd) {
	const { data } = await api.delete(`/board/${id}`, passwd);

	return data;
}
