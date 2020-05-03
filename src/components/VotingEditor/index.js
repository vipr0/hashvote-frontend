import React, { useState, useEffect } from "react";
import {
  Typography,
  Descriptions,
  Form,
  Input,
  Button,
  Space,
  message,
  Row,
  Col,
  Popconfirm,
} from "antd";
import Loader from "../Loader";
import API from "../../utils/api";
import "./style.css";
import CSVUploader from "../CSVUploader";
import ConfirmAdminToken from "../ConfirmAdminTokenModal";
import { useHistory } from "react-router-dom";
import moment from "moment";

const { TextArea } = Input;
const { Title } = Typography;

const VotingEditor = ({ match }) => {
  const [adminToken, setAdminToken] = useState();
  const [voting, setVoting] = useState({});
  const [loading, setIsLoading] = useState(true);
  const history = useHistory();

  const handleAction = async (type, data = null) => {
    try {
      message.loading({ content: "Processing...", key: "action" });
      let result;
      switch (type) {
        case "update":
          result = await API.updateVoting(match.params.votingId, data);
          break;

        case "archive":
          result = await API.archiveVoting(match.params.votingId);
          break;

        case "delete":
          result = await API.deleteVoting(match.params.votingId);
          history.push("/admin");
          break;

        default:
          throw new Error("Not correct action");
      }
      message.success({ content: result, key: "action", duration: 5 });
    } catch (err) {
      message.error({ content: err.message, key: "action", duration: 5 });
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
      <ConfirmAdminToken
        fn={(data) => API.startVoting(match.params.votingId, data)}
      />
      <Row>
        <Col span={24} md={12}>
          <Title level={2}>{voting.title}</Title>
        </Col>

        <Col span={24} md={12} className="buttons-box">
          <Space size="middle">
            <Button
              key="1"
              type="primary"
              disabled={voting.isStarted || voting.isArchived}
              // onClick={() => dispatch({ type: "SHOW" })}
            >
              Start
            </Button>
            <Popconfirm
              title="Are you sure archive this voting?"
              onConfirm={() => handleAction("archive")}
              okText="Yes"
              cancelText="No"
            >
              <Button disabled={voting.isArchived} key="2">
                Archive
              </Button>
            </Popconfirm>
            <Popconfirm
              title="Are you sure delete this voting?"
              onConfirm={() => handleAction("delete")}
              okText="Yes"
              cancelText="No"
            >
              <Button key="3" type="danger">
                Delete{" "}
              </Button>
            </Popconfirm>
          </Space>
        </Col>
      </Row>

      <Descriptions className="voting-info" column={1}>
        <Descriptions.Item label="Created At">
          {moment(voting.createdAt).format("MMMM Do YYYY, HH:mm:ss")}
        </Descriptions.Item>
        <Descriptions.Item label="Created By">
          {voting.createdBy}
        </Descriptions.Item>
        <Descriptions.Item label="End Time">
          {moment(voting.endTime).format("MMMM Do YYYY, HH:mm:ss")}
        </Descriptions.Item>
        <Descriptions.Item label="Voting ID">
          {voting.votingId}
        </Descriptions.Item>
        <Descriptions.Item label="Creation Tx">{voting.tx}</Descriptions.Item>
      </Descriptions>

      <Row gutter={[32, 32]}>
        <Col span={24} lg={12}>
          <Title level={4}>Change voting data:</Title>
          <Form
            onFinish={(data) => handleAction("update", data)}
            initialValues={{
              title: voting.title,
              description: voting.description,
            }}
            layout="vertical"
          >
            <Form.Item name="title" label="Title">
              <Input placeholder="Please input voting title" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <TextArea
                placeholder="Please input voting description"
                autoSize
              />
            </Form.Item>
            <Form.Item style={{ textAlign: "center" }}>
              <Button type="primary" htmlType="submit">
                Update Voting Data
              </Button>
            </Form.Item>
          </Form>
        </Col>

        <Col span={24} lg={12} hidden={voting.isStarted}>
          <Title level={4}>Add users to voting:</Title>
          <Input.Password
            onChange={(e) => setAdminToken(e.target.value)}
            placeholder="Enter admin token first"
            className="admin-token-input"
          />
          <CSVUploader
            data={{ adminToken }}
            disabled={!adminToken}
            hint={"Rows must contain only emails. See example file below"}
            requestFn={(data) =>
              API.addUsersToVoting(match.params.votingId, data)
            }
          />
        </Col>
      </Row>
    </Loader>
  );
};

export default VotingEditor;
