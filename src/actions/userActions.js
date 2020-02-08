import * as UserAxios from "axios/user_axios";
import { RECEIVE_USER_TODOS } from "./types";

const receiveUserTodos = payload => ({type: RECEIVE_USER_TODOS, payload});

export const fetchUserTodos = username => dispatch
  UserAxios.fetchUserTodos(username).then(({data: payload}) =>
    dispatch(receiveUserTodos(payload))
);
