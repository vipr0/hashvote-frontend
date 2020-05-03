import React from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { forgotPassword } from "../../redux/actions/auth";

const { Title } = Typography;

const ForgotPassword = ({ loading, forgotPassword }) => {
  return (
    <Card>
      <Form onFinish={forgotPassword} style={{ textAlign: "center" }}>
        <Title level={4} style={{ marginBottom: 32 }}>
          Forgot your password?
        </Title>
        <p>
          Enter your email and we will send you an instruction how to reset
          password
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
          <Button loading={loading} type="primary" htmlType="submit">
            Send email
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

const mapStateToProps = (state) => ({ loading: state.app.loading });
const mapDispatchToProps = (dispatch) => ({
  forgotPassword: (data) => dispatch(forgotPassword(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
