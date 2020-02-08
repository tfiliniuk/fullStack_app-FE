import React from 'react';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";

import jwt_decode from "jwt-decode";

import { setAuthToken } from "axios/auth_api_axios";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import rootReducers from "./reducers";
import App from './App';
import { fetchTodos } from "./actions";

import "./styles/index.scss";

const middleware = [thunk];

// const store = createStore(rootReducers, applyMiddleware(thunk));
const store = createStore(rootReducers,compose(
    applyMiddleware(...middleware),
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
      compose
  )
);

if (localStorage.jwtToken) {
  store.dispatch(fetchTodos());
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      store.dispatch(logoutUser());
      window.location.href = "./login";
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
