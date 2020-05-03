import React from "react";
import { Button, Form, Input } from "antd";
import ModalWrapper from "../ModalWrapper";
import { connect } from "react-redux";
import { createUser } from "../../redux/actions/user";

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
  return (
    <ModalWrapper
      modalName="createUser"
      result={modal.result}
      visible={modal.visible}
      error={modal.error}
      title="Create a new user"
    >
      <Form {...formItemLayout} onFinish={createUser}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button loading={modal.loading} type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </ModalWrapper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserModal);
