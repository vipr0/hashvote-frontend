import React, { useContext } from "react";
import ModalWrapper from "../ModalWrapper";
import { Form, Input, Button } from "antd";

const ConfirmAdminToken = ({ loading, fn }) => {

  const createRequest = async (data) => {
    // try {
    //   console.log(data);
    //   dispatch({ type: "LOADING" });
    //   const result = await fn(data);
    //   dispatch({ type: "SUCCESS", description: result.message });
    // } catch (error) {
    //   dispatch({ type: "ERROR", description: error.message });
    // }
  };

  return (
    <ModalWrapper title="Enter admin token to start voting">
      <Form onFinish={createRequest}>
        <Form.Item
          name="token"
          label="Admin Token"
          rules={[{ required: true, message: "Please input admin token!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit">
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </ModalWrapper>
  );
};

export default ConfirmAdminToken;
