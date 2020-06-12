import React, { Fragment } from "react";
import { withNamespaces } from "react-i18next";
import { Layout, Button } from "antd";
import Logo from "../../assets/logo.svg";
import "./style.css";
import UserNavMenu from "./UserNavMenu";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import compose from "../../utils/compose";

const { Header } = Layout;

const mapStateToProps = (state) => ({ user: state.profile.data });

const notAuthenticatedLayout = (t) => (
  <div className="login-button">
    <Link to="/login">
      <Button type="primary" ghost>
        {t("Log In")}
      </Button>
    </Link>
  </div>
);

const autenticatedLayout = (user, t) => (
  <Fragment>
    <Link className="site-logo" to="/votings">
      <img src={Logo} className="site-logo-image" alt="Logo" />
      <p>{t("Home")}</p>
    </Link>
    <UserNavMenu user={user} />
  </Fragment>
);

const Navbar = ({ user, t }) => {
  return (
    <Header className="site-header">
      {user ? autenticatedLayout(user, t) : notAuthenticatedLayout(t)}
    </Header>
  );
};

export default compose(withNamespaces(), connect(mapStateToProps))(Navbar);
