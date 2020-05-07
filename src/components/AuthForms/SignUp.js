import React from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Card, Form, Typography, Input, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { signUp } from "../../redux/actions/profile";

const { Title } = Typography;

const SignUp = ({ signUp }) => {
  const { token } = useParams();

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
            onFinish={(data) => signUp(token, data)}
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

const mapDispatchToProps = (dispatch) => ({
  signUp: (token, data) => dispatch(signUp(token, data)),
});

export default connect(null, mapDispatchToProps)(SignUp);
