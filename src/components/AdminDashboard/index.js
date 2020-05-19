import React from "react";
import { Tabs, Row, Col, Typography, Button } from "antd";
import "./style.css";
import VotingsTable from "./VotingsTable";
import UsersTable from "./UsersTable";
import CreateVotingModal from "../CreateVotingModal";
import CreateUserModal from "../CreateUserModal";
import { connect } from "react-redux";
import { showModal } from "../../redux/actions/modals";
import { setAdminTab } from "../../redux/actions/app";
import compose from "../../utils/compose";
import adminComponent from "../adminComponent";
import protectedComponent from "../protectedComponent";
import ImportUsersModal from "../ImportUsersModal";
import WalletInfoCard from "./WalletInfoCard";
import ContractInfoCard from "./ContractInfoCard";

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
      <Title>Admin panel</Title>
      <Tabs
        defaultActiveKey={currentTab}
        type="card"
        size="large"
        onChange={changeAdminTab}
      >
        <TabPane tab="Votings" key="votings">
          <CreateVotingModal />
          <Row align="middle" gutter={[16, 16]}>
            <Col span={24} md={12}>
              <Title level={3}>Table of all votings</Title>
            </Col>

            <Col span={24} md={12} align="end">
              <Button onClick={openCreateVotingModal} type="primary">
                Add new voting
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
              <Title level={3}>Table of all users</Title>
            </Col>
            <Col span={24} md={12} align="end">
              <Row gutter={[16, 16]} justify="end">
                <Col>
                  <Button onClick={openCreateUserModal} type="primary">
                    Add new user
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
        <TabPane tab="Blockchain" key="blockchain">
          <Title level={3}>Blockchain info</Title>
          <Row gutter={[16, 16]}>
            <Col span={24} md={12}>
              <WalletInfoCard />
            </Col>
            <Col span={24} md={12}>
              <ContractInfoCard />
            </Col>
          </Row>
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
