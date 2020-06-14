import React from "react";
import { Tabs, Row, Col, Typography, Button } from "antd";
import "./style.css";
import VotingsTable from "./VotingsTable";
import UsersTable from "./UsersTable";
import CreateVotingModal from "../CreateVotingModal";
import CreateUserModal from "../CreateUserModal";
import { useSelector, useDispatch } from "react-redux";
import { showModal } from "../../redux/actions/modals";
import { setAdminTab } from "../../redux/actions/app";
import compose from "../../utils/compose";
import adminComponent from "../adminComponent";
import protectedComponent from "../protectedComponent";
import ImportUsersModal from "../ImportUsersModal";
import WalletInfoCard from "./WalletInfoCard";
import ContractInfoCard from "./ContractInfoCard";
import { useTranslation } from "react-i18next";

const { Title } = Typography;
const { TabPane } = Tabs;

const AdminDashboard = () => {
  const { t } = useTranslation();
  const currentTab = useSelector(({ app }) => app.adminTab);
  const dispatch = useDispatch();

  return (
    <div className="card-container">
      <Title>{t("Admin panel")}</Title>
      <Tabs
        defaultActiveKey={currentTab}
        type="card"
        size="large"
        onChange={(tabName) => dispatch(setAdminTab(tabName))}
      >
        <TabPane tab={t("Votings")} key="votings">
          <CreateVotingModal />
          <Row align="middle" gutter={[16, 16]}>
            <Col span={24} md={12}>
              <Title level={3}>{t("Table of all votings")}</Title>
            </Col>

            <Col span={24} md={12} align="end">
              <Button
                onClick={() => dispatch(showModal("createVoting"))}
                type="primary"
              >
                {t("Add new voting")}
              </Button>
            </Col>
          </Row>
          <VotingsTable />
        </TabPane>
        <TabPane tab={t("Users")} key="users">
          <CreateUserModal />
          <ImportUsersModal />
          <Row align="middle">
            <Col span={24} md={12}>
              <Title level={3}>{t("Table of all users")}</Title>
            </Col>
            <Col span={24} md={12} align="end">
              <Row gutter={[16, 16]} justify="end">
                <Col>
                  <Button
                    onClick={() => dispatch(showModal("createUser"))}
                    type="primary"
                  >
                    {t("Add new user")}
                  </Button>
                </Col>
                <Col>
                  <Button
                    onClick={() => dispatch(showModal("importUsers"))}
                    type="ghost"
                  >
                    {t("Import from .csv")}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
          <UsersTable />
        </TabPane>
        <TabPane tab={t("Blockchain")} key="blockchain">
          <Title level={3}>{t("Blockchain info")}</Title>
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

export default compose(protectedComponent, adminComponent)(AdminDashboard);
