import * as APIAxios from "axios/auth_api_axios";

import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  RECEIVE_USER_LOGOUT
} from "./types";


export const signup = (user, history) => dispatch => {
  APIAxios.signup(user).then(
    res => {
      history.push("/login")
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
};

export const loginUser = user => dispatch => {
  APIAxios.signin(user)
  .then(res=> {
    const { token } = res.data;
    localStorage.setItem("jwtToken", token);
    APIAxios.setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  }
  );
};

// Set logged in user
export const setCurrentUser = currentUser => {
  return {
    type: SET_CURRENT_USER,
    payload: currentUser
  };
};

// User loading
export const setUserLoading  = () => {
  return {
    type: USER_LOADING
  };
};

export const logout = () => ({
  type: RECEIVE_USER_LOGOUT,
});

// Log user out
export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  APIAxios.setAuthToken(null);
  dispatch(logout());
};
