import React from "react";
import { Button, Form, Select, Input, Typography } from "antd";
import ModalWrapper from "../ModalWrapper";
import RaiseHand from "../../assets/raise-hand.svg";
import "./style.css";

const { Option } = Select;
const { Title } = Typography;

const VoteModal = ({ loading, visible, votingID, candidates, handleHide }) => {
  const handleRequest = async (data) => {
    // try {
    //   dispatch({ type: "LOADING" });
    //   const result = await API.voteForCandidate(data);
    //   dispatch({ type: "SUCCESS", description: result.message });
    // } catch (error) {
    //   dispatch({ type: "ERROR", description: error.message });
    // }
  };

  return (
    <ModalWrapper>
      <div>
        <div className="modal-description">
          <img src={RaiseHand} alt="Raise hand" className="modal-image" />
          <Title level={3}>Choose you candidate and enter your token</Title>
        </div>
        <Form onFinish={handleRequest}>
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
            <Button type="primary" htmlType="submit" loading={loading}>
              Vote for candidate
            </Button>
          </Form.Item>
        </Form>
      </div>
    </ModalWrapper>
  );
};

export default VoteModal;
