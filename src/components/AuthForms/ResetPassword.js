import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { resetPassword } from "../../redux/actions/profile";
import FormWrapper from "./authFormWrapper";
import { useTranslation } from "react-i18next";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const { t } = useTranslation();

  return (
    <FormWrapper
      fn={(data) => dispatch(resetPassword(token, data))}
      title={t("Reset password")}
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
          {t("Reset password")}
        </Button>
      </Form.Item>
    </FormWrapper>
  );
};

export default ResetPassword;
