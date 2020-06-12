import React from "react";
import { Typography } from "antd";
import { withNamespaces } from "react-i18next";

const { Title, Paragraph } = Typography;

const VotingDecription = ({ description, t }) => {
  return (
    <div>
      <Title level={2}>{t("Description")}</Title>
      <Paragraph>{description}</Paragraph>
    </div>
  );
};

export default withNamespaces()(VotingDecription);
