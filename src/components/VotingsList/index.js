import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { Typography, Card, Row, Col } from "antd";
import Loader from "../Loader";
import { connect } from "react-redux";
import { getAllVotings } from "../../redux/actions/votings";
import protectedComponent from "../protectedComponent";

const { Title } = Typography;
const { Meta } = Card;

const VotingsList = ({ votings, loading, getAllVotings }) => {
  useEffect(() => {
    getAllVotings();
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
                actions={[<Link to={`/votings/${_id}`}>Go to voting</Link>]}
              >
                <Meta
                  title={title}
                  description={description}
                  style={{ overflow: "hidden", height: 76 }}
                />
              </Card>
            </Col>
          ))}
        </Row>
      ) : null}
    </Loader>
  );
};

const mapStateToProps = (state) => ({
  votings: state.votings.data,
  loading: state.votings.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getAllVotings: () => dispatch(getAllVotings()),
});

export default protectedComponent(
  connect(mapStateToProps, mapDispatchToProps)(VotingsList)
);
