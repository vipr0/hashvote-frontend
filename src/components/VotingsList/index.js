import React from "react";
import { Typography, Row, Col, Empty, Button, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import protectedComponent from "../protectedComponent";
import Loader from "../Loader";
import VotingCard from "./VotingCard";
import compose from "../../utils/compose";
import { useState } from "react";
import moment from "moment";

const { Title } = Typography;

const VotingsList = ({ availableVotings = [], loading }) => {
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
      <Menu.Item key="all">All</Menu.Item>
      <Menu.Item key="notstarted">Not started</Menu.Item>
      <Menu.Item key="active">Active</Menu.Item>
      <Menu.Item key="finished">Finished</Menu.Item>
    </Menu>
  );

  return (
    <Loader loading={loading}>
      <Row justify="space-between" gutter={[16, 16]}>
        <Col>
          <Title level={3}>List of all available votings</Title>
        </Col>
        <Col>
          <Dropdown overlay={filterMenu} trigger={["click"]}>
            <Button ghost type="primary">
              Filter <DownOutlined />
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
        <Empty description="No votings" />
      )}
    </Loader>
  );
};

const mapStateToProps = (state) => ({
  availableVotings: state.profile.data.votings,
  loading: state.votings.loading,
});

export default compose(
  protectedComponent,
  connect(mapStateToProps)
)(VotingsList);
