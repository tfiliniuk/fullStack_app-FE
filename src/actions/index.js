import * as TodoAxios from "axios/todo_axios";
import {
  RECEIVE_TODOS,
  RECEIVE_TODO,
  RECEIVE_EDIT_TODO,
  REMOVE_TODO
} from "./types";

const receiveTodos = payload => ({ type: RECEIVE_TODOS, payload });

const receiveTodo = todo => ({ type: RECEIVE_TODO, todo });

const receiveEditTodo = todo => ({ type: RECEIVE_EDIT_TODO, todo });

const removeTodo = id => ({ type: REMOVE_TODO, id });


export const createTodo = todo => dispatch =>
  TodoAxios.createTodo(todo).then(({ data: todo }) =>
    dispatch(receiveTodo(todo)),
  );

  export const editTodo = (id, editedTodo) => dispatch =>
    TodoAxios.editTodo(id, editedTodo).then(
      res => {
        dispatch(receiveEditTodo(res.data));
      },
      err => {
        throw err;
      },
    );

export const deleteTodo = id => dispatch =>
  TodoAxios.deleteTodo(id).then(
    () => dispatch(removeTodo(id)),
    err => {
      throw err;
    },
  );

export const fetchTodos  = () => dispatch =>
  TodoAxios.fetchTodos().then(({data}) => dispatch(receiveTodos(data)))


export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
});

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
  SHOW_IMPORTANT: 'SHOW_IMPORTANT'
}
