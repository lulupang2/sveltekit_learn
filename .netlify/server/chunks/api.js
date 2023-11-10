import axios from "axios";
const PUBLIC_LOCAL_URL = "http://localhost:9999/api";
const PUBLIC_BASE_URL = "http://rocky.jisung.pro:9999/api";
const baseURL = process.env.NODE_ENV === `production` ? PUBLIC_BASE_URL : process.env.NODE_ENV === `development` ? PUBLIC_LOCAL_URL : PUBLIC_BASE_URL;
const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 3e3
});
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    return Promise.reject(error);
  }
);
const getPosts = async (pageNum = 0) => {
  const { data } = await api.get(`/board?pageNum=${pageNum}`);
  return data;
};
const getPost = async (id) => {
  const { data } = await api.get(`/board/${id}`);
  return data;
};
async function createPost(newPost) {
  const { data } = await api.post(`/board`, newPost);
  return data;
}
export {
  getPost as a,
  createPost as c,
  getPosts as g
};
