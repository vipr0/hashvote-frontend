import React from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "../ModalWrapper";
import { createUser } from "../../redux/actions/user";
import { useTranslation } from "react-i18next";

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const CreateUserModal = () => {
  const dispatch = useDispatch();
  const modal = useSelector(({ modals }) => modals.createUser);
  const { t } = useTranslation();

  return (
    <ModalWrapper
      modalName="createUser"
      result={modal.result}
      visible={modal.visible}
      error={modal.error}
      title={t("Create a new user")}
    >
      <Form {...formItemLayout} onFinish={(data) => dispatch(createUser(data))}>
        <Form.Item
          name="name"
          label={t("Name")}
          rules={[{ required: true, message: t("Please input name!") }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label={t("Email")}
          rules={[{ required: true, message: t("Please input email!") }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button loading={modal.loading} type="primary" htmlType="submit">
            {t("Create")}
          </Button>
        </Form.Item>
      </Form>
    </ModalWrapper>
  );
};

export default CreateUserModal;
