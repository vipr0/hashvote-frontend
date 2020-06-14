import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Layout, Button } from "antd";
import Logo from "../../assets/logo.svg";
import "./style.css";
import UserNavMenu from "./UserNavMenu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const { Header } = Layout;

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

const Navbar = () => {
  const { t } = useTranslation();
  const user = useSelector(({ profile }) => profile.data);

  return (
    <Header className="site-header">
      {user ? autenticatedLayout(user, t) : notAuthenticatedLayout(t)}
    </Header>
  );
};

export default Navbar;
