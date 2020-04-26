import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Menu, Avatar } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SecurityScanOutlined,
} from "@ant-design/icons";
import API from "../../utils/api";
import Loader from "../Loader";

const { SubMenu } = Menu;

const UserNavMenu = () => {
  const history = useHistory();
  const [user, setUser] = useState({});
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    API.getMe().then((data) => {
      setUser(data);
      setIsLoading(false);
    });
  }, []);

  function logout() {
    API.logout().then(() => history.push("/login"));
  }

  return (
    <Loader loading={loading}>
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={["home"]}>
        <SubMenu
          style={{ float: "right" }}
          title={
            <span>
              <Avatar
                icon={<UserOutlined />}
                src={user.photo ? `${API.url}/img/users/${user.photo}` : null}
                style={{ marginRight: 12 }}
              />
              {user.name}
            </span>
          }
        >
          {user.role === "admin" ? (
            <Menu.Item key="admin">
              <Link to="/admin">
                <SecurityScanOutlined />
                Admin Panel
              </Link>
            </Menu.Item>
          ) : null}

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
    </Loader>
  );
};

export default UserNavMenu;
