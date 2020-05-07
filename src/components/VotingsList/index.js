import React, { useEffect } from "react";
import { Typography, Row, Empty } from "antd";
import Loader from "../Loader";
import { connect } from "react-redux";
import { getAllVotings } from "../../redux/actions/votings";
import protectedComponent from "../protectedComponent";
import VotingCard from "./VotingCard";
import { v4 as uuidv4 } from "uuid";
import compose from "../../utils/compose";

const { Title } = Typography;

const VotingsList = ({ availableVotings = [], loading, getAllVotings }) => {
  useEffect(() => {
    getAllVotings();
  }, []);

  return (
    <Loader loading={loading}>
      <Title level={2}>List of all available votings</Title>
      {availableVotings.length ? (
        <Row gutter={[16, 16]}>
          {availableVotings.map((voting) => (
            <VotingCard voting={voting.voting} key={uuidv4()} />
          ))}
        </Row>
      ) : (
        <Empty />
      )}
    </Loader>
  );
};

const mapStateToProps = (state) => ({
  availableVotings: state.profile.data.votings,
  loading: state.votings.loading,
});

const mapDispatchToProps = (dispatch) => ({
  getAllVotings: () => dispatch(getAllVotings()),
});

export default compose(
  protectedComponent,
  connect(mapStateToProps, mapDispatchToProps)
)(VotingsList);
