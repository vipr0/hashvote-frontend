import React from "react";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";

const { Title, Paragraph } = Typography;

const VotingDecription = ({ description }) => {
  const { t } = useTranslation();
  return (
    <div>
      <Title level={2}>{t("Description")}</Title>
      <Paragraph>{description}</Paragraph>
    </div>
  );
};

export default VotingDecription;
