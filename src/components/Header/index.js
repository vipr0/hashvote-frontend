import React, { useState, useEffect, Fragment } from "react";
import { Layout, message, Button } from "antd";
import Logo from "../../assets/logo.svg";
import API from "../../utils/api";
import "./style.css";
import UserNavMenu from "../UserNavMenu";
import { Link } from "react-router-dom";

const { Header } = Layout;

export default () => {
  const [user, setUser] = useState();

  useEffect(() => {
    API.getMe()
      .then((data) => setUser(data))
      .catch((err) => message.info(err.message));
  }, []);

  return (
    <Header className="site-header" style={{ padding: 0 }}>
      {user ? (
        <Fragment>
          <Link className="site-logo" to="/votings">
            <img src={Logo} className="site-logo-image" alt="Logo" />
            <p>Home</p>
          </Link>
          <UserNavMenu user={user} />
        </Fragment>
      ) : (
        <div className="login-button">
          <Link to="/login">
            <Button type="primary" ghost>
              Log In
            </Button>
          </Link>
        </div>
      )}
    </Header>
  );
};
