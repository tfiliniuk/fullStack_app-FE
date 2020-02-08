import axios from "axios";

export const fetchUserTodos = username => axios.get(`/api/users/${username}`);

export const findUsers = query => axios.get("/api/user/find?query=" + query);
export const getMe = () => axios.get("/api/user/me");
