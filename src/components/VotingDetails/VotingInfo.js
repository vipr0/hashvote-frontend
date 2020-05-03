import React from "react";
import { Typography, Progress, Row, Col, Card, Statistic } from "antd";

const { Title } = Typography;
const { Countdown } = Statistic;

const VotingInfo = ({
  loading,
  started,
  endTime,
  alreadyVoted,
  votersTotal,
}) => {
  if (!started) {
    return (
      <Card loading={loading}>
        <Title level={4}>Voting is not yet started</Title>
      </Card>
    );
  }

  return (
    <Card loading={loading}>
      <Row align="middle" justify="space-between">
        <Title level={4}>Time to end</Title>
        <Countdown value={endTime} format="HH:mm:ss" />
      </Row>
      <Row align="middle" justify="space-between">
        <Col span={12}>
          <Title level={4}>Tournout</Title>
        </Col>
        <Col span={12}>
          <Progress
            percent={(alreadyVoted / votersTotal) * 100}
            strokeColor={{
              "0%": "#108ee9",
              "100%": "#87d068",
            }}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default VotingInfo;
