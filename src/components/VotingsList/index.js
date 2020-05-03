import React, { useEffect } from "react";
import { Typography, Row, Empty } from "antd";
import Loader from "../Loader";
import { connect } from "react-redux";
import { getAllVotings } from "../../redux/actions/votings";
import protectedComponent from "../protectedComponent";
import VotingCard from "./VotingCard";

const { Title } = Typography;

const VotingsList = ({ votings, loading, getAllVotings }) => {
  useEffect(() => {
    getAllVotings();
  }, []);

  return (
    <Loader loading={loading}>
      <Title level={2}>List of all available votings</Title>
      {votings ? (
        <Row gutter={[16, 16]}>
          {votings.map(({ title, description, _id }) => (
            <VotingCard title={title} description={description} id={_id} />
          ))}
        </Row>
      ) : (
        <Empty />
      )}
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
