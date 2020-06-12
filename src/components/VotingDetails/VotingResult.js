import React from "react";
import { Typography, Progress, Card } from "antd";
import { withNamespaces } from "react-i18next";

const { Text } = Typography;

const VotingResult = ({ loading, result, allVotes, t }) => {
  return (
    <Card loading={loading} title={t("Options")}>
      {result &&
        result.map((candidate, i) => (
          <div key={i} style={{ marginBottom: 20 }}>
            <Text strong> {`${i + 1}. ${candidate.name}`} </Text>

            <Progress
              percent={Math.round((candidate.votesNum / allVotes) * 100)}
            />
          </div>
        ))}
    </Card>
  );
};

export default withNamespaces()(VotingResult);
