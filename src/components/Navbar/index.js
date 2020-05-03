import React, { Fragment } from "react";
import { Layout, Button } from "antd";
import Logo from "../../assets/logo.svg";
import "./style.css";
import UserNavMenu from "./UserNavMenu";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const { Header } = Layout;

const mapStateToProps = (state) => ({ user: state.profile.data });

const notAuthenticatedLayout = () => (
  <div className="login-button">
    <Link to="/login">
      <Button type="primary" ghost>
        Log In
      </Button>
    </Link>
  </div>
);

const autenticatedLayout = (user) => (
  <Fragment>
    <Link className="site-logo" to="/votings">
      <img src={Logo} className="site-logo-image" alt="Logo" />
      <p>Home</p>
    </Link>
    <UserNavMenu user={user} />
  </Fragment>
);

const Navbar = ({ user }) => {
  return (
    <Header className="site-header">
      {user ? autenticatedLayout(user) : notAuthenticatedLayout()}
    </Header>
  );
};

export default connect(mapStateToProps)(Navbar);
