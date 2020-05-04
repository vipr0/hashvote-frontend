import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Card, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { logIn } from "../../redux/actions/profile";

const { Title } = Typography;

const mapStateToProps = (state) => ({ loading: state.app.loading });
const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(logIn(data)),
});

const Login = ({ login, loading }) => {
  return (
    <Card>
      <Form onFinish={login} style={{ textAlign: "center" }}>
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
        <Form.Item>
          <Link to="/forgot">Forgot password</Link>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
