import { GET_CHATS, AFTER_POST_MESSAGE } from "actions/types";

const chatReducers = (state={}, action) => {
  switch(action.type) {
    case GET_CHATS:
    // console.log(action)
      return {...state, chats: action.payload };
    case AFTER_POST_MESSAGE:
    console.log(state)
      return {...state, chats: state.chats.concat(action.payload)};
    default:
      return state;
  }
}

export default chatReducers;
