import React from "react";
import { Layout } from "antd";
import Logo from "../../assets/logo.svg";
import "./style.css";

import UserNavMenu from "../UserNavMenu";
import { Link } from "react-router-dom";

const { Header } = Layout;

export default () => {
  return (
    <Header className="site-header" style={{ padding: 0 }}>
      <Link className="site-logo" to="/votings">
        <img src={Logo} className="site-logo-image" alt="Logo" />
        <p>Home</p>
      </Link>
      <UserNavMenu />
    </Header>
  );
};
