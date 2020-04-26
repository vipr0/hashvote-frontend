import React from "react";
import { Switch, Route } from "react-router-dom";
import { Layout } from "antd";

import VotingEditor from "../../components/VotingEditor";
import AdminDashboard from "../../components/AdminDashboard";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import UsersTable from "../../components/UsersTable";
import VotingsTable from "../../components/VotingsTable";
import GroupsTable from "../../components/GroupsTable";

const { Content } = Layout;

const AdminPage = ({ match }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar />
      <Layout>
        <Header />
        <Content style={{ margin: "0 16px" }}>
          <Layout
            className="site-layout-background"
            style={{ padding: "32px 0" }}
          >
            <Content style={{ padding: "0 24px" }}>
              <Switch>
                <Route
                  path={`${match.url}/`}
                  component={AdminDashboard}
                  exact
                />
                <Route
                  path={`${match.url}/votings`}
                  component={VotingsTable}
                  exact
                />
                <Route
                  path={`${match.url}/users`}
                  component={UsersTable}
                  exact
                />
                <Route
                  path={`${match.url}/groups`}
                  component={GroupsTable}
                  exact
                />
                <Route
                  path={`${match.url}/votings/:votingId`}
                  component={VotingEditor}
                  exact
                />
              </Switch>
            </Content>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPage;
