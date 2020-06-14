import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { logIn } from "../../redux/actions/profile";
import "./style.css";
import FormWrapper from "./authFormWrapper";
import { withNamespaces } from "react-i18next";

const Login = ({ t }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.app.loading);

  return (
    <FormWrapper fn={(data) => dispatch(logIn(data))} title={t("Log in")}>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: t("Please input your Username!"),
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder={t("Email")}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: t("Please input your Password!"),
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder={t("Password")}
        />
      </Form.Item>
      <Form.Item>
        <Link to="/forgot">{t("Forgot password?")}</Link>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {t("Log in")}
        </Button>
      </Form.Item>
    </FormWrapper>
  );
};

export default withNamespaces()(Login);
