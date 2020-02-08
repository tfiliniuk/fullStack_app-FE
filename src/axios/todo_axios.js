import axios from "axios";

export const fetchTodos = () => axios.get("/api/todos", { headers: { Authorization: localStorage.getItem('jwtToken') } });

export const editTodo = (id, todo) => axios.put(`/api/todos/${id}`, ( todo ), { headers: { Authorization: localStorage.getItem('jwtToken') } });

export const deleteTodo = id => axios.delete(`/api/todos/${id}`, { headers: { Authorization: localStorage.getItem('jwtToken') } });

export const createTodo = todo => axios.post(`/api/todos`, ( todo ), { headers: { Authorization: localStorage.getItem('jwtToken') } });
