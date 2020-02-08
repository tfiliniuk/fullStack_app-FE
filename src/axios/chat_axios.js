import axios from "axios";

export const fetchChats = () => axios.get("/api/chat/getChats", { headers: { Authorization: localStorage.getItem('jwtToken') } });
export const uploadFile = file => axios.post("/api/chat/uploadfiles", (file), { headers: { Authorization: localStorage.getItem('jwtToken') } });
