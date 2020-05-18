import React from "react";
import { Tabs, Row, Col, Typography, Button } from "antd";
import "./style.css";
import VotingsTable from "./VotingsTable";
import UsersTable from "./UsersTable";
import CreateVotingModal from "../CreateVotingModal";
import CreateUserModal from "../CreateUserModal";
import { connect } from "react-redux";
import { showModal } from "../../redux/actions/modals";
import { setAdminTab, showMessage } from "../../redux/actions/app";
import compose from "../../utils/compose";
import adminComponent from "../adminComponent";
import protectedComponent from "../protectedComponent";
import ImportUsersModal from "../ImportUsersModal";

const { Title } = Typography;
const { TabPane } = Tabs;

const mapStateToProps = (state) => ({
  currentTab: state.app.adminTab,
});

const mapDispatchToProps = (dispatch) => ({
  openCreateVotingModal: () => dispatch(showModal("createVoting")),
  openCreateUserModal: () => dispatch(showModal("createUser")),
  openImportUsersModal: () => dispatch(showModal("importUsers")),
  changeAdminTab: (tabName) => dispatch(setAdminTab(tabName)),
});

const AdminDashboard = ({
  openCreateVotingModal,
  openCreateUserModal,
  openImportUsersModal,
  changeAdminTab,
  currentTab,
}) => {
  return (
    <div className="card-container">
      <Tabs
        defaultActiveKey={currentTab}
        type="card"
        size="large"
        onChange={changeAdminTab}
      >
        <TabPane tab="Votings" key="votings">
          <CreateVotingModal />
          <Row align="middle">
            <Col span={24} md={12}>
              <Title>Table of votings</Title>
            </Col>

            <Col span={24} md={12} align="end">
              <Button onClick={openCreateVotingModal} type="primary">
                Create new voting
              </Button>
            </Col>
          </Row>
          <VotingsTable />
        </TabPane>
        <TabPane tab="Users" key="users">
          <CreateUserModal />
          <ImportUsersModal />
          <Row align="middle">
            <Col span={24} md={12}>
              <Title>Table of users</Title>
            </Col>
            <Col span={24} md={12} align="end">
              <Row gutter={[16, 16]} justify="end">
                <Col>
                  <Button onClick={openCreateUserModal} type="primary">
                    Create new user
                  </Button>
                </Col>
                <Col>
                  <Button onClick={openImportUsersModal} type="ghost">
                    Import from .csv
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <UsersTable />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default compose(
  protectedComponent,
  adminComponent,
  connect(mapStateToProps, mapDispatchToProps)
)(AdminDashboard);
