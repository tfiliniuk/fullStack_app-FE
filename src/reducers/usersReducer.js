import { RECEIVE_USER_TODOS, RECEIVE_TODOS } from "actions/types";

const usersReducer = (state={}, action) => {
  switch(action.type) {
    case RECEIVE_TODOS:
      return action.payload;
    case RECEIVE_USER_TODOS:
      return [...state, action.payload.user];
    default:
      return state;
  }
}

export default usersReducer;
