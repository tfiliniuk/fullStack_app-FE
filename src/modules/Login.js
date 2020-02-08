import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Form, Icon, Input, Button, Checkbox } from 'antd';
import classnames from "classnames";
import { Register } from "./"
import { loginUser } from "actions/authActions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({[e.target.id]: e.target.value})
  };

  handleSubmit = e =>  {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="auth__wrapper">
          <Form onSubmit={this.handleSubmit} className={classnames("auth__form", {"error": errors.message})} >
            <Form.Item>
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email"
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                className={classnames("", {
                 invalid: errors.email || errors.emailnotfound
               })}
              />
              <span className="red-text">
                {errors.email}
                {errors.emailnotfound}
            </span>
            </Form.Item>
            <Form.Item className="test">
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                className={classnames("", {
                  invalid: errors.password || errors.passwordincorrect
                })}
              />
              <span className="red-text">
               {errors.password}
               {errors.passwordincorrect}
               </span>
            </Form.Item>
            <Form.Item>
              <Checkbox>Remember me</Checkbox>
              <a className="login-form-forgot" href="/">
                Forgot password
              </a>
              {errors.message ? <div className="error-message">{errors.message}</div> : ""}
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or <Link to="/register">register now!</Link>
              <Route path="/register" component={Register} />
            </Form.Item>
          </Form>
        </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
