import React from "react";
import { Form, Input, Button, Row, Col, Card, Typography, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import API from "../../utils/api";
import PageLayout from "../../components/PageLayout";

const { Title } = Typography;

const ForgotPage = () => {
  const forgot = async (values) => {
    try {
      message.info({ content: "Please wait...", key: "forgot" });
      const result = await API.forgotPassword(values);
      message.success({ content: result.message, key: "forgot", duration: 6 });
    } catch (error) {
      message.error({ content: error.message, key: "forgot", duration: 3 });
    }
  };

  return (
    <PageLayout>
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ heignt: "100%" }}
      >
        <Col>
          <Card>
            <Form
              name="forgot_password"
              initialValues={{
                remember: true,
              }}
              onFinish={forgot}
              style={{ textAlign: "center" }}
            >
              <Title level={4} style={{ marginBottom: 32 }}>
                Forgot your password?
              </Title>
              <p>
                Enter your email and we will send you an instruction how to
                reset password
              </p>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Your email" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Send email
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  );
};

export default ForgotPage;
