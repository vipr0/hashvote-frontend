import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Typography, Card, Row, Col } from "antd";
import API from "../../utils/api";
import Loader from "../Loader";

const { Title } = Typography;
const { Meta } = Card;

const VotingsList = () => {
  const [loading, setIsLoading] = useState(true);
  const [votings, setVotings] = useState();

  useEffect(() => {
    API.getVotings().then((data) => {
      setVotings(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <Loader loading={loading}>
      <Title level={2}>List of all available votings</Title>
      {votings ? (
        <Row gutter={[16, 16]}>
          {votings.map(({ title, description, _id }, i) => (
            <Col key={i} span={24} md={8} lg={6}>
              <Card
                hoverable
                style={{ height: 144 }}
                actions={[<Link to={`/votings/${_id}`}>Go to voting</Link>]}
              >
                <Meta title={title} description={description} />
              </Card>
            </Col>
          ))}
        </Row>
      ) : null}
    </Loader>
  );
};

export default VotingsList;
