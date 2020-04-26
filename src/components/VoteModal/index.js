import React from "react";
import { Button, Form, Select, Input, Typography } from "antd";
import ModalWrapper from "../ModalWrapper";
import API from "../../utils/api";
import RaiseHand from "../../assets/raise-hand.svg";
import "./style.css";

const { Option } = Select;
const { Title } = Typography;

const VoteModal = ({ visible, votingID, candidates, handleHide }) => {
  const [form] = Form.useForm();

  const renderForm = (handleRequest, loading) => {
    return (
      <div>
        <div className="modal-description">
          <img src={RaiseHand} alt="Raise hand" className="modal-image" />
          <Title level={3}>Choose you candidate and enter your token</Title>
        </div>
        <Form form={form} onFinish={handleRequest}>
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
    );
  };

  const createRequest = async (values) => {
    const fields = await form.validateFields();
    const result = await API.voteForCandidate(votingID, fields);
    return {
      status: "success",
      title: "You have been succesfully voted",
      description: `This is hash of transaction: ${result.result.tx}`,
    };
  };

  return (
    <ModalWrapper
      visible={visible}
      handleHide={handleHide}
      modalForm={renderForm}
      createRequest={createRequest}
    />
  );
};

export default VoteModal;
