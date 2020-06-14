import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Menu } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SecurityScanOutlined,
} from "@ant-design/icons";
import { logOut } from "../../redux/actions/profile";
import UserAvatar from "../UserAvatar";

const { SubMenu } = Menu;

const UserNavMenu = ({ user, logout }) => {
  const { t } = useTranslation();

  return (
    <Menu theme="light" mode="horizontal">
      <SubMenu
        style={{ float: "right" }}
        title={
          <span>
            <UserAvatar user={user} />
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

export default connect(null, mapDispatchToProps)(UserNavMenu);
