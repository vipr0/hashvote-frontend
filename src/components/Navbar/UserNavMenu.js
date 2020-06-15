import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Menu } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SecurityScanOutlined,
} from "@ant-design/icons";
import { logOut } from "../../redux/actions/profile";
import UserAvatar from "../UserAvatar";

const { SubMenu } = Menu;

const UserNavMenu = ({ user }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logOut());
    history.push("/login");
  };

  return (
    <Menu theme="light" mode="horizontal">
      <SubMenu
        style={{ float: "right" }}
        title={
          <span>
            <UserAvatar photo={user.photo} />
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

        <Menu.Item onClick={handleLogout} key="logout">
          <LogoutOutlined />
          {t("Log Out")}
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default UserNavMenu;
