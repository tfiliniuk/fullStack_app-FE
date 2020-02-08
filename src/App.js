import React, { Suspense } from 'react';
import { connect } from "react-redux";
import { Route, Redirect, Switch} from "react-router-dom";

import { Auth, Todo, Home, Chat } from 'pages';

import { Navbar } from "components";


const App = props => {
  const {isAuth} = props;
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <div className="App">
        <div className="wrapper">
          <Navbar />
          <Switch>
            <Route exact path={["/login", "/register"]} component={Auth} />
            <Route
              exact
              path="/"
              render={() =>
                console.log(isAuth) || isAuth ? <Home /> : <Redirect to="/login" />
              }
            />
            <Route
              exact
              path="/todo"
              render={() =>
                console.log(isAuth) || isAuth ? <Todo /> : <Redirect to="/login" />
              }
            />
            <Route
              path="/chat"
              render={() =>
                console.log(isAuth) || isAuth ? <Chat /> : <Redirect to="/login" />
              }
            />
          </Switch>
      </div>
    </div>
  </Suspense>
  );
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  null
)(App);
