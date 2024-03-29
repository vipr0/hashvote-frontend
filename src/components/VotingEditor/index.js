import React, { useEffect, useState } from "react";
import { Typography, Row, Col, Tabs } from "antd";
import { useParams, useHistory } from "react-router-dom";
import "./style.css";
import Loader from "../Loader";
import AddUsersCard from "./AddUsersCard";
import ChangeVotingDataCard from "./ChangeVotingDataCard";
import VotingInfoCard from "./VotingInfoCard";
import ActionButtons from "../VotingEditor/ActionButtons";
import { useDispatch, useSelector } from "react-redux";
import { getVoting } from "../../redux/actions/voting";
import StartVotingModal from "../StartVotingModal";
import compose from "../../utils/compose";
import adminComponent from "../adminComponent";
import protectedComponent from "../protectedComponent";
import VotersList from "./VotersList";
import EventsList from "../EventsList";
import { useTranslation } from "react-i18next";
import ErrorIndicator from "../ErrorIndicator";

const { Title } = Typography;
const { TabPane } = Tabs;

const VotingEditor = () => {
  const { votingId } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const voting = useSelector(({ voting }) => voting.dataFromDB);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    dispatch(getVoting(votingId)).catch(() => {
      setError("No voting with that ID");
    });
  }, []);

  if (error) {
    return (
      <ErrorIndicator
        error={error}
        hideError={() => {
          setError(null);
          history.push("/admin");
        }}
      />
    );
  }

  if (voting.loading) return <Loader loading={true} />;

  return (
    <div>
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
            <EventsList />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default compose(protectedComponent, adminComponent)(VotingEditor);
