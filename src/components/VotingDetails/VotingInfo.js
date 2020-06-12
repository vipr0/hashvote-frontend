import React from "react";
import { withNamespaces } from "react-i18next";
import { Typography, Progress, Row, Col, Card, Statistic, Empty } from "antd";

const { Text } = Typography;
const { Countdown } = Statistic;

const VotingInfo = ({
  loading,
  started,
  endTime,
  alreadyVoted,
  votersTotal,
  t,
}) => {
  if (!started) {
    return (
      <Card loading={loading}>
        <Empty description={t("Voting is not yet started")} />
      </Card>
    );
  }

  return (
    <Card loading={loading} title={t("Common information")}>
      <Row align="middle" justify="space-between" style={{ marginBottom: 12 }}>
        <Text strong>{t("Time to end")}</Text>
        <Countdown
          value={endTime}
          format="HH:mm:ss"
          valueStyle={{ fontSize: 18 }}
        />
      </Row>
      <Row align="middle" justify="space-between" style={{ marginBottom: 12 }}>
        <Col span={12}>
          <Text strong>{t("Tournout")}</Text>
        </Col>
        <Col span={12}>
          <Progress
            percent={Math.round((alreadyVoted / votersTotal) * 100)}
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

export default withNamespaces()(VotingInfo);
