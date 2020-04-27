import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Row, Col, Card, Typography, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import API from "../../utils/api";
import PageLayout from "../../components/PageLayout";

const { Title } = Typography;

const ResetPasswordPage = ({ match }) => {
  const history = useHistory();
  const forgot = async (values) => {
    try {
      message.info({ content: "Please wait...", key: "reset" });
      const result = await API.resetPassword(match.params.token, values);
      message.success({ content: result.message, key: "reset", duration: 6 });
      history.push("/votings");
    } catch (error) {
      message.error({ content: error.message, key: "reset", duration: 3 });
    }
  };

  return (
    <PageLayout>
      <Row type="flex" justify="center" align="middle">
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
                Reset your passowrd
              </Title>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Your new password"
                />
              </Form.Item>
              <Form.Item
                name="passwordConfirm"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password again!",
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Your new password again"
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Reset password
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  );
};

export default ResetPasswordPage;
