import React from "react";
import { Button, Form, Input } from "antd";
import ModalWrapper from "../ModalWrapper";

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const CreateUserModal = ({ loading }) => {
  const createUser = async (data) => {
    // try {
    //   dispatch({ type: "LOADING" });
    //   const result = await API.createUser(data);
    //   dispatch({ type: "SUCCESS", description: result.message });
    // } catch (error) {
    //   dispatch({ type: "ERROR", description: error.message });
    // }
  };

  return (
    <ModalWrapper title="Create a new voting">
      <Form {...formItemLayout} onFinish={createUser}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </ModalWrapper>
  );
};

export default CreateUserModal;
