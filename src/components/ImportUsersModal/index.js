import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ModalWrapper from "../ModalWrapper";
import { importUsers } from "../../redux/actions/users";

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const ImportUsersModal = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modals.importUsers);

  const handleSubmit = (data) => {
    const formData = new FormData();
    formData.append("file", data.file.file);
    dispatch(importUsers(formData));
  };

  return (
    <ModalWrapper
      modalName="importUsers"
      result={modal.result}
      visible={modal.visible}
      error={modal.error}
      title="Import users"
    >
      <Form {...formItemLayout} onFinish={handleSubmit}>
        <Form.Item name="file" label="File" valuePropName="file">
          <Upload
            name="file"
            multiple={false}
            beforeUpload={() => false}
            accept=".csv"
          >
            <Button>
              <UploadOutlined /> Click to select csv file
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </ModalWrapper>
  );
};

export default ImportUsersModal;
