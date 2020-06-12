import React from "react";
import { Link } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { Card, Col } from "antd";

const { Meta } = Card;

const VotingCard = ({ voting, t }) => {
  const { title, description, _id } = voting;
  return (
    <Col span={24} md={8} lg={6}>
      <Card
        hoverable
        actions={[<Link to={`/votings/${_id}`}>{t("Go to voting")}</Link>]}
      >
        <Meta
          title={title}
          description={description}
          style={{ overflow: "hidden", height: 76 }}
        />
      </Card>
    </Col>
  );
};

export default withNamespaces()(VotingCard);
