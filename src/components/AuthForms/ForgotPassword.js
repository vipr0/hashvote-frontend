import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/actions/profile";
import FormWrapper from "./authFormWrapper";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.app.loading);

  return (
    <FormWrapper
      title="Forgot password?"
      fn={(data) => dispatch(forgotPassword(data))}
    >
      <p>Please fill in the email that you used to register.</p>
      <p>
        You will be sent an email with instructions on how to reset your
        password.
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
    </FormWrapper>
  );
};

export default ForgotPassword;
