import React from "react";
import { Typography, Progress, Row, Col, Card, Statistic, Empty } from "antd";

const { Text } = Typography;
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
        <Empty description="Voting is not yet started" />
      </Card>
    );
  }

  return (
    <Card loading={loading} title="Common information">
      <Row align="middle" justify="space-between" style={{ marginBottom: 12 }}>
        <Text strong>Time to end</Text>
        <Countdown
          value={endTime}
          format="HH:mm:ss"
          valueStyle={{ fontSize: 18 }}
        />
      </Row>
      <Row align="middle" justify="space-between" style={{ marginBottom: 12 }}>
        <Col span={12}>
          <Text strong>Tournout</Text>
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
