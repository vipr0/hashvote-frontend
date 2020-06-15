import React from "react";
import { useTranslation } from "react-i18next";
import { Typography, Row, Col, Tabs } from "antd";
import { useSelector } from "react-redux";
import ChangePasswordCard from "./ChangePasswordCard";
import ChangeDataCard from "./ChangeDataCard";
import protectedComponent from "../protectedComponent";
import UserAvatar from "../UserAvatar";
import OtherCard from "./OtherCard";

const { Title } = Typography;
const { TabPane } = Tabs;

const MyProfile = () => {
  const user = useSelector((state) => state.profile.data);
  const { t } = useTranslation();

  return (
    <div>
      <Row>
        <Col>
          <UserAvatar photo={user.photo} size="large" />
        </Col>
        <Col>
          <Title level={3}>{user.name}</Title>
        </Col>
      </Row>
      <Tabs>
        <TabPane tab={t("Change data")} key="data">
          <ChangeDataCard name={user.name} email={user.email} />
        </TabPane>
        <TabPane tab={t("Change password")} key="password">
          <ChangePasswordCard />
        </TabPane>
        <TabPane tab="Other" key="other">
          <OtherCard />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default protectedComponent(MyProfile);
