import React from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Row, Col, Card, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import API from "../../utils/api";

const { Title } = Typography;

const LoginPage = () => {
  const history = useHistory();

  function login(values) {
    API.login(values)
      .then(() => history.push("/"))
      .catch((err) => alert(err.message));
  }

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "100vh" }}
    >
      <Col>
        <Card>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={login}
            style={{ textAlign: "center" }}
          >
            <Title level={4}>Log In</Title>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            {/* <Form.Item>
                  <Link href="/admin/forgot">
                    <a>Forgot password</a>
                  </Link>
                </Form.Item> */}

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginPage;
