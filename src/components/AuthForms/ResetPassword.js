import React from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { resetPassword } from "../../redux/actions/auth";

const { Title } = Typography;

const ResetPassword = ({ match, resetPassword }) => {
  return (
    <Card>
      <Form
        onFinish={(data) => resetPassword(match.params.token, data)}
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
  );
};

const mapDispatchToProps = (dispatch) => ({
  resetPassword: (token, data) => dispatch(resetPassword(token, data)),
});

export default connect(null, mapDispatchToProps)(ResetPassword);
