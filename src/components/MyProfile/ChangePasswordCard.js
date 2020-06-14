import React from "react";
import { Form, Input, Button, Card } from "antd";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { changeProfilePassword } from "../../redux/actions/profile";

const ChangePasswordCard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Card title={t("Change your password")} bordered={false}>
      <Form
        onFinish={(data) => dispatch(changeProfilePassword(data))}
        layout="vertical"
      >
        <Form.Item
          name="password"
          label={t("Current password")}
          rules={[
            {
              required: true,
              message: t("Please input your current password"),
            },
          ]}
        >
          <Input.Password
            placeholder={t("Please input your current password")}
          />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label={t("New password")}
          rules={[
            { required: true, message: t("Please input your new password") },
          ]}
        >
          <Input.Password placeholder={t("Please input your new password")} />
        </Form.Item>
        <Form.Item
          name="newPasswordConfirm"
          label={t("New password confirm")}
          rules={[
            {
              required: true,
              message: t("Please input your new password again"),
            },
          ]}
        >
          <Input.Password
            placeholder={t("Please input your new password again")}
          />
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit">
            {t("Update Password")}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ChangePasswordCard;
