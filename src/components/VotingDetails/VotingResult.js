import React from "react";
import { Typography, Progress, Card } from "antd";

const { Title } = Typography;

const VotingResult = ({ loading, result, allVotes }) => {
  return (
    <Card loading={loading}>
      <Title level={3}>Candidates</Title>
      {result &&
        result.map((candidate, i) => (
          <div key={i}>
            <Title level={4}>{`${i + 1}. ${candidate.name}`}</Title>
            <Progress
              percent={Math.round((candidate.votesNum / allVotes) * 100)}
            />
          </div>
        ))}
    </Card>
  );
};

export default VotingResult;
