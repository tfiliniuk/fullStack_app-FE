import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";


import { logoutUser } from "../../actions/authActions";

import { Button } from 'antd';

import "./style.scss";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    return (
      <header className="header">
      <div className="navbar dark-bg">
        <div className="navbar__left">
          <div className="navbar__toggle">
            <Button type="primary" icon="menu" />
          </div>
          <Link
            to="/"
            className="logo"
            >
            My <span>diary</span>
          </Link>
          <Link
            to="/todo"
            className="navbar__left-link"
            >
            Todo
          </Link>
          <Link
            to="/chat"
            className="navbar__left-link"
            >
            Chat
          </Link>
        </div>
        <div className="navbar__right">
          <div className="navbar__auth">

            <span className="navbar__auth-name"> {user.fullname ? user.fullname.split(" ")[0] : ""}</span>
            <button
              onClick={this.onLogoutClick}
              className="navbar__auth-btn"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      </header>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
