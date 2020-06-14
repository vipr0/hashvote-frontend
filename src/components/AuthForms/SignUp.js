import React from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { signUp } from "../../redux/actions/profile";
import FormWrapper from "./authFormWrapper";
import { withNamespaces } from "react-i18next";

const SignUp = ({ t }) => {
  const { token } = useParams();
  const dispatch = useDispatch();

  return (
    <FormWrapper
      fn={(data) => dispatch(signUp(token, data))}
      title={t("Activate account")}
    >
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: t("Please input your new password!"),
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder={t("Your new password")}
        />
      </Form.Item>
      <Form.Item
        name="passwordConfirm"
        rules={[
          {
            required: true,
            message: t("Please input your new password again!"),
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder={t("Your new password again")}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {t("Sign up")}
        </Button>
      </Form.Item>
    </FormWrapper>
  );
};

export default withNamespaces()(SignUp);
