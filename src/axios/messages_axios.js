import { axios } from "core";

export const getAllByDialogId = id => axios.get("messages?dialog=" + id);
export const removeById = id => axios.delete("/messages?id=" + id);
export const send = (text, dialogId, attachments) => axios.post("/messages", {
  text: text,
  dialog_id: dialogId,
  attachments
});
