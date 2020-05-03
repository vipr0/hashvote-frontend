import React from "react";
import { Form, Input, Button, Card } from "antd";

const ChangePasswordCard = () => {
  return (
    <Card title="Change your password" bordered={false}>
      <Form 
      // onFinish={(data) => updateData(data, "password")} 
      layout="vertical">
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
        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit">
            Update Password
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ChangePasswordCard;
