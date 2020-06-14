import React from "react";
import { useTranslation } from "react-i18next";
import { Typography, Row, Col, Empty, Button, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import protectedComponent from "../protectedComponent";
import Loader from "../Loader";
import VotingCard from "./VotingCard";
import { useState } from "react";
import moment from "moment";

const { Title } = Typography;

const VotingsList = () => {
  const { t } = useTranslation();
  const loading = useSelector(({ votings }) => votings.loading);
  const availableVotings = useSelector(({ profile }) => profile.data.votings);
  const [votings, filterVotings] = useState(availableVotings);

  const handleFilter = ({ key }) => {
    switch (key) {
      case "notstarted":
        filterVotings(
          availableVotings.filter(({ voting }) => !voting.isStarted)
        );
        break;
      case "active":
        filterVotings(
          availableVotings.filter(
            ({ voting }) => voting.isStarted && !voting.isArchived
          )
        );
        break;
      case "finished":
        filterVotings(
          availableVotings.filter(
            ({ voting }) =>
              voting.isArchived || moment(voting.endTime).valueOf() < Date.now()
          )
        );
        break;
      default:
        filterVotings(availableVotings);
        break;
    }
  };

  const filterMenu = (
    <Menu onClick={handleFilter}>
      <Menu.Item key="all">{t("All")}</Menu.Item>
      <Menu.Item key="notstarted">{t("Not started")}</Menu.Item>
      <Menu.Item key="active">{t("Active")}</Menu.Item>
      <Menu.Item key="finished">{t("Finished")}</Menu.Item>
    </Menu>
  );

  return (
    <Loader loading={loading}>
      <Row justify="space-between" gutter={[16, 16]}>
        <Col>
          <Title level={3}>{t("List of all available votings")}</Title>
        </Col>
        <Col>
          <Dropdown overlay={filterMenu} trigger={["click"]}>
            <Button ghost type="primary">
              {t("Filter")} <DownOutlined />
            </Button>
          </Dropdown>
        </Col>
      </Row>

      {votings.length ? (
        <Row gutter={[16, 16]}>
          {votings.map((voting) => (
            <VotingCard voting={voting.voting} key={uuidv4()} />
          ))}
        </Row>
      ) : (
        <Empty description={t("No votings")} />
      )}
    </Loader>
  );
};

export default protectedComponent(VotingsList);
