import React, { useEffect, useState } from "react";
import { Typography, Form, Input, Button, message, Row, Col } from "antd";
import API from "../../utils/api";
import PageLayout from "../../components/PageLayout";
import Loader from "../../components/Loader";
import AvatarUploader from "../../components/AvatarUploader";

const { Title } = Typography;

const MePage = () => {
  const [me, setMe] = useState({});
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    API.getMe().then((data) => {
      setMe(data);
      setIsLoading(false);
    });
  }, []);

  const updateData = async (data, type) => {
    message.loading({ content: "Updating your data...", key: "update" });
    API.updateMe(data, type)
      .then((result) => {
        message.success({ content: result, key: "update", duration: 3 });
      })
      .catch((err) =>
        message.error({ content: err.message, key: "update", duration: 3 })
      );
  };

  return (
    <PageLayout>
      <Loader loading={loading}>
        <Title>Hello, {me.name}</Title>
        <Row gutter={[32, 16]}>
          <Col span={24} sm={12}>
            <Title level={3}>Change your data:</Title>
            <Form
              onFinish={(data) => updateData(data, "data")}
              initialValues={{ name: me.name, email: me.email }}
            >
              <Form.Item name="name" label="Your name">
                <Input placeholder="Please input your name" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Your email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                ]}
              >
                <Input placeholder="Please input your email" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update Data
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={24} sm={12}>
            <Title level={3}>Change your avatar:</Title>
            <AvatarUploader />
          </Col>
          <Col span={24} sm={12}>
            <Title level={3}>Change your password:</Title>
            <Form onFinish={(data) => updateData(data, "password")}>
              <Form.Item
                name="password"
                label="Current password"
                rules={[
                  {
                    required: true,
                    message: "Please input your current password",
                  },
                ]}
              >
                <Input.Password placeholder="Please input your current password" />
              </Form.Item>
              <Form.Item
                name="newPassword"
                label="New password"
                rules={[
                  { required: true, message: "Please input your new password" },
                ]}
              >
                <Input.Password placeholder="Please input your new password" />
              </Form.Item>
              <Form.Item
                name="newPasswordConfirm"
                label="New password confirm"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password again",
                  },
                ]}
              >
                <Input.Password placeholder="Please input your new password again" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update Password
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Loader>
    </PageLayout>
  );
};

export default MePage;
