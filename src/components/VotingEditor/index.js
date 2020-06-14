import React, { useEffect } from "react";
import { Typography, Row, Col, Tabs } from "antd";
import { useParams } from "react-router-dom";
import "./style.css";
import Loader from "../Loader";
import AddUsersCard from "./AddUsersCard";
import ChangeVotingDataCard from "./ChangeVotingDataCard";
import VotingInfoCard from "./VotingInfoCard";
import ActionButtons from "../VotingEditor/ActionButtons";
import { connect } from "react-redux";
import { getVoting } from "../../redux/actions/voting";
import StartVotingModal from "../StartVotingModal";
import compose from "../../utils/compose";
import adminComponent from "../adminComponent";
import protectedComponent from "../protectedComponent";
import VotersList from "./VotersList";
import EventsList from "../EventsList";
import { withNamespaces } from "react-i18next";

const { Title } = Typography;
const { TabPane } = Tabs;

const mapStateToProps = (state) => ({
  voting: state.voting.dataFromDB,
  loading: state.voting.dataFromDB.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getVoting: (id) => dispatch(getVoting(id)),
});

const VotingEditor = ({ loading, voting = {}, getVoting, t }) => {
  const { votingId } = useParams();
  useEffect(() => {
    getVoting(votingId);
  }, []);

  return (
    <Loader loading={loading}>
      <StartVotingModal votingId={votingId} />
      <Row gutter={[32, 32]}>
        <Col span={24} md={12}>
          <Title level={2}>{voting.title}</Title>
        </Col>

        <Col span={24} md={12} className="buttons-box">
          <ActionButtons voting={voting} />
        </Col>
      </Row>

      <div className="card-container">
        <Tabs type="card">
          <TabPane tab={t("Information")} key="1">
            <Row gutter={[32, 32]}>
              <Col span={24} md={12}>
                <VotingInfoCard voting={voting} />
              </Col>
              <Col span={24} md={12}>
                <ChangeVotingDataCard
                  initialValues={{
                    title: voting.title,
                    description: voting.description,
                  }}
                />
              </Col>
            </Row>
          </TabPane>
          <TabPane tab={t("Voters")} key="2">
            <Row gutter={[32, 32]}>
              <Col span={24} lg={12}>
                <VotersList />
              </Col>
              <Col span={24} lg={12} hidden={voting.isStarted}>
                <AddUsersCard />
              </Col>
            </Row>
          </TabPane>
          <TabPane tab={t("Events")} key="3">
            <EventsList/>
          </TabPane>
        </Tabs>
      </div>
    </Loader>
  );
};

export default compose(
  protectedComponent,
  adminComponent,
  withNamespaces(),
  connect(mapStateToProps, mapDispatchToProps)
)(VotingEditor);
