import React from "react";
import { Typography, Progress, Card } from "antd";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

const VotingResult = ({ loading, result, allVotes }) => {
  const { t } = useTranslation();

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

export default VotingResult;
