import React from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Card, Form, Typography, Input, Button, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import API from "../../utils/api";

const { Title } = Typography;

const SignUp = ({ match }) => {
  const history = useHistory();

  const signup = async (data) => {
    try {
      message.loading({ content: "Please wait", key: "activate" });
      const result = await API.finishRegister(match.params.token, data);
      console.log(result);
      message.success({ content: result.message, key: "activate" });
      history.push("/votings");
    } catch (err) {
      message.error({ content: err.message, key: "activate" });
    }
  };

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "90vh" }}
    >
      <Col>
        <Card>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={signup}
            style={{ textAlign: "center" }}
          >
            <Title level={4}>Finish registration</Title>
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
                Sign up
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default SignUp;
