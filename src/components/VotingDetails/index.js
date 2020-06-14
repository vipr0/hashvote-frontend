import React, { useEffect } from "react";
import { Typography, Button, Row, Col } from "antd";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import VoteModal from "../VoteModal";
import VotingDecription from "./VotingDecription";
import VotingResult from "./VotingResult";
import VotingInfo from "./VotingInfo";
import { getVoting } from "../../redux/actions/voting";
import protectedComponent from "../protectedComponent";
import { showModal } from "../../redux/actions/modals";
import compose from "../../utils/compose";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

const mapStateToProps = (state) => ({
  dataFromDB: state.voting.dataFromDB,
  dataFromContract: state.voting.dataFromContract,
});

const mapDispatchToProps = (dispatch) => ({
  getVoting: (id) => dispatch(getVoting(id)),
  openModal: () => dispatch(showModal("vote")),
});

const VotingDetails = ({
  getVoting,
  openModal,
  dataFromDB,
  dataFromContract,
}) => {
  let { votingId } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    getVoting(votingId);
  }, []);

  if (dataFromDB.loading) {
    return <Loader loading={dataFromDB.loading} />;
  }

  return (
    <Loader loading={dataFromDB.loading && dataFromContract.loading}>
      <VoteModal candidates={dataFromDB.candidates} votingId={votingId} />

      <Row gutter={[32, 32]}>
        <Col span={24} md={12}>
          <Title level={2}>{dataFromDB.title}</Title>
          <Button
            disabled={!dataFromDB.isStarted}
            type="primary"
            onClick={openModal}
          >
            {t("Vote for candidate")}
          </Button>
        </Col>
        <Col span={24} md={12}>
          <VotingInfo
            loading={dataFromContract.loading}
            started={dataFromDB.isStarted}
            endTime={dataFromDB.endTime}
            alreadyVoted={dataFromContract.alreadyVoted}
            votersTotal={dataFromContract.votersTotal}
          />
        </Col>
      </Row>
      <Row gutter={[32, 32]}>
        <Col span={24} md={12}>
          <VotingDecription description={dataFromDB.description} />
        </Col>
        <Col span={24} md={12}>
          <VotingResult
            loading={dataFromContract.loading}
            result={dataFromContract.voteResult}
            allVotes={dataFromContract.votersTotal}
          />
        </Col>
      </Row>
    </Loader>
  );
};

export default compose(
  protectedComponent,
  connect(mapStateToProps, mapDispatchToProps)
)(VotingDetails);
