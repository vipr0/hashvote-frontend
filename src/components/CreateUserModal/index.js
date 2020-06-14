import React from "react";
import { Button, Form, Input } from "antd";
import { connect } from "react-redux";
import ModalWrapper from "../ModalWrapper";
import { createUser } from "../../redux/actions/user";
import { useTranslation } from "react-i18next";

const mapStateToProps = (state) => ({
  modal: state.modals.createUser,
});

const mapDispatchToProps = (dispatch) => ({
  createUser: (data) => dispatch(createUser(data)),
});

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const CreateUserModal = ({ modal, createUser }) => {
  const { t } = useTranslation();

  return (
    <ModalWrapper
      modalName="createUser"
      result={modal.result}
      visible={modal.visible}
      error={modal.error}
      title={t("Create a new user")}
    >
      <Form {...formItemLayout} onFinish={createUser}>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserModal);
