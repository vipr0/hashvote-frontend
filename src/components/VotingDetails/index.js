import React, { useEffect, useState } from "react";
import { Typography, Button, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import Loader from "../Loader";
import VoteModal from "../VoteModal";
import VotingDecription from "./VotingDecription";
import VotingResult from "./VotingResult";
import VotingInfo from "./VotingInfo";
import { getVoting } from "../../redux/actions/voting";
import protectedComponent from "../protectedComponent";
import { showModal } from "../../redux/actions/modals";
import { useTranslation } from "react-i18next";
import ErrorIndicator from "../ErrorIndicator";

const { Title } = Typography;

const VotingDetails = () => {
  let { votingId } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const voting = useSelector(({ voting }) => voting.dataFromDB);
  const results = useSelector(({ voting }) => voting.dataFromContract);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(getVoting(votingId)).catch(() =>
      setError("No voting with this ID")
    );
  }, []);

  if (error) {
    return (
      <ErrorIndicator
        error={error}
        hideError={() => {
          setError(null);
          history.push("/votings");
        }}
      />
    );
  }

  if (voting.loading) return <Loader loading={true} />;

  return (
    <Loader loading={voting.loading && results.loading}>
      <VoteModal candidates={voting.candidates} votingId={votingId} />

      <Row gutter={[32, 32]}>
        <Col span={24} md={12}>
          <Title level={2}>{voting.title}</Title>
          <Button
            disabled={!voting.isStarted}
            type="primary"
            onClick={() => dispatch(showModal("vote"))}
          >
            {t("Vote for candidate")}
          </Button>
        </Col>
        <Col span={24} md={12}>
          <VotingInfo
            loading={results.loading}
            started={voting.isStarted}
            endTime={voting.endTime}
            alreadyVoted={results.alreadyVoted}
            votersTotal={results.votersTotal}
          />
        </Col>
      </Row>
      <Row gutter={[32, 32]}>
        <Col span={24} md={12}>
          <VotingDecription description={voting.description} />
        </Col>
        <Col span={24} md={12}>
          <VotingResult
            loading={results.loading}
            result={results.voteResult}
            allVotes={results.votersTotal}
          />
        </Col>
      </Row>
    </Loader>
  );
};

export default protectedComponent(VotingDetails);
