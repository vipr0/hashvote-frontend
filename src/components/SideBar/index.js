import React from "react";
import { withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  AuditOutlined,
  TeamOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

class SideMenu extends React.Component {
  state = {
    collapsed: true,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  redirectTo = (e) => {
    this.props.history.push(`/admin/${e.key}`);
  };

  render() {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <Menu mode="vertical" defaultSelectedKeys={["votings"]} theme="dark">
          <Menu.Item key="#" style={{ margin: "12px 0" }} onClick={this.redirectTo}>
            <HomeOutlined />
            <span>Dashboard</span>
          </Menu.Item>
          <Menu.Item key="votings" onClick={this.redirectTo}>
            <AuditOutlined />
            <span>Votings</span>
          </Menu.Item>
          <Menu.Item key="users" onClick={this.redirectTo}>
            <UserOutlined />
            <span>Users</span>
          </Menu.Item>
          <Menu.Item key="groups" onClick={this.redirectTo}>
            <TeamOutlined />
            <span>Groups</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(SideMenu);
