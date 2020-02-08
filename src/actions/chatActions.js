import * as ChatAxios from "axios/chat_axios";
import { GET_CHATS, AFTER_POST_MESSAGE } from "./types";

const receiveChats = payload => ({type: GET_CHATS, payload});
export const postMessage = data => ({type: AFTER_POST_MESSAGE, payload: data});

export const fetchChats = () => dispatch => {
  ChatAxios.fetchChats().then(({data: payload}) => {
    dispatch(receiveChats(payload))
  })
};
