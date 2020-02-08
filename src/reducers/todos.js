import {
  RECEIVE_TODOS,
  RECEIVE_TODO,
  RECEIVE_EDIT_TODO,
  REMOVE_TODO
} from "actions/types";

const todos = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_TODO:

      return [...state, action.todo];
    case RECEIVE_EDIT_TODO:
     return state.map(todo =>
        todo._id === action.todo._id ? action.todo: todo
      );
    case REMOVE_TODO:
    return state.filter(todo =>
      todo._id !== action.id);
    case RECEIVE_TODOS:
      return action.payload
    default:
    return state;
  }
}

export default todos;
