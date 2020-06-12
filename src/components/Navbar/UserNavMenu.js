import React from "react";
import { Link } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { connect } from "react-redux";
import { Menu, Avatar } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SecurityScanOutlined,
} from "@ant-design/icons";
import { apiUrl } from "../../utils/api";
import { logOut } from "../../redux/actions/profile";
import compose from "../../utils/compose";

const { SubMenu } = Menu;

const UserNavMenu = ({ user, logout, t }) => {
  return (
    <Menu theme="light" mode="horizontal">
      <SubMenu
        style={{ float: "right" }}
        title={
          <span>
            <Avatar
              icon={<UserOutlined />}
              src={user.photo ? `${apiUrl}/img/users/${user.photo}` : null}
              style={{ marginRight: 12 }}
            />
            {user.name}
          </span>
        }
      >
        {user.role === "admin" && (
          <Menu.Item key="admin">
            <Link to="/admin">
              <SecurityScanOutlined />
              {t("Admin panel")}
            </Link>
          </Menu.Item>
        )}

        <Menu.Item key="profile">
          <Link to="/me">
            <UserOutlined />
            {t("My Profile")}
          </Link>
        </Menu.Item>
        <Menu.Item onClick={logout} key="logout">
          <LogoutOutlined />
          {t("Log Out")}
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logOut()),
});

export default compose(
  withNamespaces(),
  connect(null, mapDispatchToProps)
)(UserNavMenu);
