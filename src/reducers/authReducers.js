import isEmpty from "is-empty";

import {
  SET_CURRENT_USER,
  USER_LOADING,
  RECEIVE_USER_LOGOUT
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case RECEIVE_USER_LOGOUT:
      return initialState;
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
    return state;

  }
}

export default authReducers;
