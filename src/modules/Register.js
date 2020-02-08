import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Form, Icon, Input, Button } from 'antd';
import classnames from "classnames";

import { signup } from "actions/authActions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      fullname: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
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

    const newUser = {
      fullname: this.state.fullname,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.signup(newUser, this.props.history);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="auth__wrapper">
          <Form onSubmit={this.handleSubmit} className="auth__form">
            <Form.Item label="Name" htmlFor="name">
              <Input
                prefix={<Icon type="question-circle-o" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Name"
                onChange={this.onChange}
                value={this.state.fullname}
                error={errors.fullname}
                id="fullname"
                type="text"
              />
            </Form.Item>
            <Form.Item label="Email" htmlFor="email">
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
            <Form.Item label="Password" htmlFor="password" hasFeedback>
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
              <Form.Item label="Confirm password" htmlFor="password2" hasFeedback>
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Confirm password"
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <span className="red-text">
                 {errors.password2}
                 </span>
              </Form.Item>
              <Form.Item>
                {errors.message ? <div className="error-message">{errors.message}</div> : ""}
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Register
                </Button>
            </Form.Item>
          </Form>
        </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { signup }
)(withRouter(Register));
