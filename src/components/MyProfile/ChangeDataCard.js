import React from "react";
import { Form, Input, Button, Card } from "antd";

const ChangeDataCard = ({ name, email }) => {
  return (
    <Card title="Change your data" bordered={false}>
      <Form
        // onFinish={(data) => updateData(data, "data")}
        initialValues={{ name, email }}
        layout="vertical"
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
        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit">
            Update Data
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ChangeDataCard;
