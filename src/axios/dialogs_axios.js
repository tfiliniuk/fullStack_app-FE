import { axios } from "core";

export const getAll = () => axios.get("/dialogs");
export const create = ({ partner, text }) => axios.post("/dialogs", { partner, text });
