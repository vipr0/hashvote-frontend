import React from "react";
import { Form, Input, Button, Card, Select } from "antd";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/actions/user";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const EditDataCard = ({ initialValues }) => {
  const { userId } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Card title={t("Edit user data")}>
      <Form
        onFinish={(data) => dispatch(updateUser(userId, data))}
        initialValues={initialValues}
        layout="vertical"
      >
        <Form.Item name="name" label={t("Name")}>
          <Input placeholder={t("Please input user`s name")} />
        </Form.Item>
        <Form.Item name="email" label={t("Email")}>
          <Input placeholder={t("Please input user`s email")} />
        </Form.Item>
        <Form.Item name="role" label={t("Role")}>
          <Select placeholder={t("Select a role")}>
            <Option value="voter">{t("Voter")}</Option>
            <Option value="admin">{t("Admin")}</Option>
          </Select>
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit">
            {t("Update User`s Data")}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EditDataCard;
