import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import {
  Typography,
  Descriptions,
  Form,
  Input,
  Button,
  Row,
  Col,
  message,
  Card,
  Space,
} from "antd";
import API from "../../utils/api";
import moment from "moment";

const { Title } = Typography;

const UserEditor = ({ match }) => {
  const [user, setUser] = useState({});
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    API.getUser(match.params.userId).then((user) => {
      setUser(user);
      setIsLoading(false);
    });
  }, []);

  const updateUser = async (data) => {
    try {
      message.loading({ content: "Processing...", key: "action" });
      const result = await API.updateUser(match.params.userId, data);
      message.success({ content: result, key: "action", duration: 5 });
    } catch (error) {
      message.error({ content: error.message, key: "action", duration: 5 });
    }
  };

  const deleteUser = async () => {
    try {
      message.loading({ content: "Processing...", key: "action" });
      const result = await API.deleteUser(match.params.userId);
      message.success({ content: result, key: "action", duration: 5 });
    } catch (error) {
      message.error({ content: error.message, key: "action", duration: 5 });
    }
  };

  const resetPassword = async () => {
    try {
      message.loading({ content: "Processing...", key: "action" });
      const result = await API.forgotPassword({ email: user.email });
      message.success({ content: result.message, key: "action", duration: 5 });
    } catch (error) {
      message.error({ content: error.message, key: "action", duration: 5 });
    }
  };

  return (
    <Loader loading={loading}>
      <Row>
        <Col span={24} sm={12}>
          <Title>{user.name}</Title>
        </Col>
        <Col span={24} sm={12}>
          <Space
            size="middle"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Button key="reset-password" type="primary" onClick={resetPassword}>
              Reset password
            </Button>
            <Button key="delete" type="danger" onClick={deleteUser}>
              Delete
            </Button>
          </Space>
        </Col>
      </Row>

      <Row gutter={[32, 32]}>
        <Col span={24} md={12}>
          <Card title="User data">
            <Descriptions column={1} bordered>
              <Descriptions.Item label="ID">{user._id}</Descriptions.Item>
              <Descriptions.Item label="Verified">
                {user.isVerified ? "Yes" : "No"}
              </Descriptions.Item>
              <Descriptions.Item label="Role">{user.role}</Descriptions.Item>
              <Descriptions.Item label="Last password change">
                {moment(user.passwordChangedAt).fromNow()}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col span={24} md={12}>
          <Card title="Edit user">
            <Form
              onFinish={updateUser}
              initialValues={{ name: user.name, email: user.email }}
              layout="vertical"
            >
              <Form.Item name="name" label="Name">
                <Input placeholder="Please input user`s name" />
              </Form.Item>
              <Form.Item name="email" label="Email">
                <Input placeholder="Please input user`s email" />
              </Form.Item>
              <Form.Item style={{ textAlign: "center" }}>
                <Button type="primary" htmlType="submit">
                  Update User`s Data
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Loader>
  );
};

export default UserEditor;
