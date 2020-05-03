import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const VotingDecription = ({ description }) => {
  return (
    <div>
      <Title level={2}>Description</Title>
      <Paragraph>{description}</Paragraph>
    </div>
  );
};

export default VotingDecription;
