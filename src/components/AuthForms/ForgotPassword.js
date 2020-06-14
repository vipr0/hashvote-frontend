import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/actions/profile";
import FormWrapper from "./authFormWrapper";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.app.loading);
  const { t } = useTranslation();

  return (
    <FormWrapper
      title={t("Forgot password?")}
      fn={(data) => dispatch(forgotPassword(data))}
    >
      <p>{t("Please fill in the email that you used to register.")}</p>
      <p>
        {t(
          "You will be sent an email with instructions on how to reset your password."
        )}
      </p>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: t("Please input your email!"),
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder={t("Your email")} />
      </Form.Item>
      <Form.Item>
        <Button loading={loading} type="primary" htmlType="submit">
          {t("Send email")}
        </Button>
      </Form.Item>
    </FormWrapper>
  );
};

export default ForgotPassword;
