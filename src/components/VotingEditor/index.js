import React, { useState, useEffect } from "react";
import {
  Typography,
  Descriptions,
  Form,
  Input,
  Button,
  Space,
  message,
} from "antd";
import Loader from "../Loader";
import API from "../../utils/api";

const { Title } = Typography;

const VotingEditor = ({ match }) => {
  const [voting, setVoting] = useState({});
  const [loading, setIsLoading] = useState(true);

  const updateVoting = async (data) => {
    try {
      message.loading({ content: "Updating data...", key: "update" });
      const result = await API.updateVoting(match.params.votingId, data);
      message.success({ content: result, key: "update", duration: 5 });
    } catch ({ message }) {
      message.success({ content: message, key: "update", duration: 5 });
    }
  };

  useEffect(() => {
    API.getVotingDB(match.params.votingId).then((result) => {
      setVoting(result);
      setIsLoading(false);
    });
  }, []);
  return (
    <Loader loading={loading}>
      <Title>{voting.title}</Title>
      <Space size="middle">
        <Button key="1" type="primary" disabled={voting.isStarted}>
          Start
        </Button>
        <Button key="2">Archive</Button>
        <Button key="3" type="danger">
          Delete
        </Button>
      </Space>

      <Descriptions
        layout="vertical"
        style={{ margin: "32px 0" }}
        // title="Voting info"
        // column={{ xs: 1, sm: 1, md: 2, xxl: 3 }}
      >
        <Descriptions.Item label="Created At">
          {voting.createdAt}
        </Descriptions.Item>
        <Descriptions.Item label="Created By">
          {voting.createdBy}
        </Descriptions.Item>
        <Descriptions.Item label="End Time">{voting.endTime}</Descriptions.Item>
        <Descriptions.Item label="Voting ID" span={3}>
          {voting.votingId}
        </Descriptions.Item>
        <Descriptions.Item label="Creation Tx" span={3}>
          {voting.tx}
        </Descriptions.Item>
      </Descriptions>
      <Title level={4}>Change voting data:</Title>
      <Form
        onFinish={updateVoting}
        initialValues={{ title: voting.title, description: voting.description }}
      >
        <Form.Item name="title" label="Voting title">
          <Input placeholder="Please input voting title" />
        </Form.Item>
        <Form.Item name="description" label="Voting description">
          <Input placeholder="Please input voting description" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Voting Data
          </Button>
        </Form.Item>
      </Form>
    </Loader>
  );
};

export default VotingEditor;
