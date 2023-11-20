import { dev } from '$app/environment';
import { goto } from '$app/navigation';
import { PUBLIC_LOCAL_URL } from '$env/static/public';
import axios from 'axios';

const baseURL = dev ? PUBLIC_LOCAL_URL : `http://152.69.230.5:9999/api`;
export const api = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json'
	},
	timeout: 3000
});

api.interceptors.request.use(
	function (config) {
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);
api.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		if (error.response && error.response.status) {
			switch (error.response.status) {
				case 404:
					return [];
				default:
					return Promise.reject(error);
			}
		}

		return Promise.reject(error);
	}
);

export const getPosts = async (pageNum, type, search) => {
	try {
		if (type && search) {
			const { data } = await api.get(`/board?pageNum=${pageNum}&type=${type}&search=${search}`);
			return data;
		} else {
			const { data } = await api.get(`/board?pageNum=${pageNum}`);
			return data;
		}
	} catch (error) {
		console.error(error);
	}
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

export async function searchPosts(type, query) {
	const { data } = await api.get(`/board/search?type=${type}?query=${query}`);

	return data;
}

export async function createComment(postId, body) {
	const { data } = await api.post(`/board/${postId}/comment`, body);

	return data;
}
