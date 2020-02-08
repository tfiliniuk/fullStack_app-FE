import React from "react";
import { Route } from "react-router-dom";

import { Login, Register } from "modules";
import "./Auth.scss"

const Auth = () => {
  return (
    <section className="auth">
      <Route exact path={["/", "/login"]} component={Login} />
      <Route path="/register" component={Register} />
    </section>
  )
}

export default Auth;
