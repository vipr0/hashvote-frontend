import React  from "react";
import { Tabs } from "antd";
import "./style.css";
import VotingsTable from "../VotingsTable";
import UsersTable from "../UsersTable";

const { TabPane } = Tabs;
const AdminDashboard = () => {
  return (
      <div className="card-container">
        <Tabs type="card" size="large">
          <TabPane tab="Votings" key="votings">
            <VotingsTable />
          </TabPane>
          <TabPane tab="Users" key="users">
            <UsersTable />
          </TabPane>
        </Tabs> 
      </div>
  );
};

export default AdminDashboard;
