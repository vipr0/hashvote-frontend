import React from "react";
import { Button, Form, Select, Input, Typography } from "antd";
import { connect } from "react-redux";
import ModalWrapper from "../ModalWrapper";
import RaiseHand from "../../assets/raise-hand.svg";
import "./style.css";
import { voteForCandidate } from "../../redux/actions/voting";

const { Option } = Select;
const { Title } = Typography;

const mapStateToProps = (state) => ({
  modal: state.modals.vote,
});

const mapDispatchToProps = (dispatch) => ({
  voteForCandidate: (id, data) => dispatch(voteForCandidate(id, data)),
});

const VoteModal = ({ modal, votingId, candidates = [], voteForCandidate }) => {
  return (
    <ModalWrapper
      modalName="vote"
      result={modal.result}
      visible={modal.visible}
      error={modal.error}
      title="Vote for a candiate"
    >
      <div>
        <div className="modal-description">
          <img src={RaiseHand} alt="Raise hand" className="modal-image" />
          <Title level={3}>Choose you candidate and enter your token</Title>
        </div>
        <Form onFinish={(data) => voteForCandidate(votingId, data)}>
          <Form.Item
            name="candidate"
            label="Candidate"
            hasFeedback
            rules={[
              { required: true, message: "Please select your candidate!" },
            ]}
          >
            <Select placeholder="Please select a candidate">
              {candidates.map((candidate, i) => (
                <Option key={i} value={candidate}>
                  {candidate}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="token"
            label="Your token"
            rules={[{ required: true, message: "Please enter your token!" }]}
          >
            <Input placeholder="Your token" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={modal.loading}>
              Vote for candidate
            </Button>
          </Form.Item>
        </Form>
      </div>
    </ModalWrapper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(VoteModal);
