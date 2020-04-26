import React, { useEffect, useState } from "react";
import { Typography, Button, Progress, Row, Col, Card, Statistic } from "antd";
import API from "../../utils/api";
import Loader from "../Loader";
import "./style.css";
import VoteModal from "../VoteModal";

const { Title, Paragraph } = Typography;
const { Countdown } = Statistic;

const VotingDetails = ({ match }) => {
  const [votingDB, setVotingDB] = useState({});
  const [votingContract, setVotingContract] = useState({});
  const [loadingDB, setIsLoadingDB] = useState(true);
  const [loadingContract, setIsLoadingContract] = useState(true);
  const [modalVisible, setModalIsVisible] = useState(false);

  useEffect(() => {
    API.getVotingDB(match.params.votingId)
      .then((data) => {
        setVotingDB(data);
        setIsLoadingDB(false);
      })
      .catch((err) => alert(err.message));
  }, []);

  useEffect(() => {
    API.getVotingContract(match.params.votingId)
      .then((data) => {
        setVotingContract(data);
        setIsLoadingContract(false);
      })
      .catch((err) => alert(err.message));
  }, []);

  return (
    <Loader loading={loadingDB}>
      <Row>
        <Col span={24} md={12} className="col-margin">
          <Title level={2}>{votingDB.title}</Title>
          <Button
            disabled={!votingDB.isStarted}
            type="primary"
            onClick={() => setModalIsVisible(true)}
          >
            Vote for candidate
          </Button>
        </Col>
        <Col span={24} md={12} className="col-margin">
          {votingContract.votingStarted ? (
            <Card loading={loadingContract}>
              <Row align="middle" justify="space-between">
                <Title level={4}>Time to end</Title>
                <Countdown value={votingDB.endTime} format="HH:mm:ss" />
              </Row>
              <Row align="middle" justify="space-between">
                <Col span={12}>
                  <Title level={4}>Tournout</Title>
                </Col>
                <Col span={12}>
                  <Progress
                    percent={
                      (votingContract.alreadyVoted /
                        votingContract.votersTotal) *
                      100
                    }
                    strokeColor={{
                      "0%": "#108ee9",
                      "100%": "#87d068",
                    }}
                  />
                </Col>
              </Row>
            </Card>
          ) : (
            <Card>
              <Title level={4}>Voting is not yet started</Title>
            </Card>
          )}
        </Col>
      </Row>
      <Row>
        <Col span={24} md={12} className="col-margin">
          <Title level={2}>Description</Title>
          <Paragraph>{votingDB.description}</Paragraph>
        </Col>
        <Col span={24} md={12} className="col-margin">
          <Card loading={loadingContract}>
            <Title level={3}>Candidates</Title>
            {votingContract.voteResult
              ? votingContract.voteResult.map((candidate, i) => (
                  <div key={i}>
                    <Title level={4}>{`${i + 1}. ${candidate.name}`}</Title>
                    <Progress
                      percent={Math.round(
                        (candidate.votesNum / votingContract.alreadyVoted) * 100
                      )}
                    />
                  </div>
                ))
              : null}
          </Card>
        </Col>
      </Row>
    </Loader>
  );
};

export default VotingDetails;
