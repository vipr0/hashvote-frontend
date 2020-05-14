import React from "react";
import { Link } from "react-router-dom";
import { Menu, Avatar } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SecurityScanOutlined,
} from "@ant-design/icons";
import { apiUrl } from "../../utils/api";
import { connect } from "react-redux";
import { logOut } from "../../redux/actions/profile";

const { SubMenu } = Menu;

const UserNavMenu = ({ user, logout }) => {
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
              Admin Panel
            </Link>
          </Menu.Item>
        )}

        <Menu.Item key="profile">
          <Link to="/me">
            <UserOutlined />
            My Profile
          </Link>
        </Menu.Item>
        <Menu.Item onClick={logout} key="logout">
          <LogoutOutlined />
          Log Out
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logOut()),
});

export default connect(null, mapDispatchToProps)(UserNavMenu);
