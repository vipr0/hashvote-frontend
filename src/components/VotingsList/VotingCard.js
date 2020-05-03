import React from "react";
import { Link } from "react-router-dom";
import { Card, Col } from "antd";

const { Meta } = Card;

const VotingCard = ({ title, description, id }) => {
  return (
    <Col span={24} md={8} lg={6}>
      <Card
        hoverable
        actions={[<Link to={`/votings/${id}`}>Go to voting</Link>]}
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

export default VotingCard;
