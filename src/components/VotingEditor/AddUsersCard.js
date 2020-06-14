import React from "react";
import { useParams } from "react-router-dom";
import { Input, Upload, Form, Button, Card } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { addUsersToVoting } from "../../redux/actions/voting";
import compose from "../../utils/compose";
import { withNamespaces } from "react-i18next";

const { Dragger } = Upload;

const mapDispatchToProps = (dispatch) => ({
  addUsersToVoting: (id, data) => {
    let formData = new FormData();
    formData.append("adminToken", data.adminToken);
    formData.append("file", data.file.fileList[0].originFileObj);
    dispatch(addUsersToVoting(id, formData));
  },
});

const AddUsersCard = ({ addUsersToVoting, t }) => {
  const { votingId } = useParams();
  return (
    <Card title={t("Add users to voting")} bordered={false}>
      <Form
        onFinish={(data) => addUsersToVoting(votingId, data)}
        layout="vertical"
      >
        <Form.Item
          name="adminToken"
          label={t("Admin token")}
          rules={[
            {
              required: true,
              message: t("Please input your admin token"),
            },
          ]}
        >
          <Input.Password placeholder={t("Enter admin token first")} />
        </Form.Item>
        <Form.Item
          name="file"
          label={t("CSV file")}
          rules={[
            {
              required: true,
              message: t("Please add csv file with users emails"),
            },
          ]}
        >
          <Dragger
            accept=".csv"
            name="file"
            multiple={false}
            beforeUpload={() => false}
          >
            <p className="ant-upload-drag-icon">
              <FileAddOutlined />
            </p>
            <p className="ant-upload-text">
              {t("Click or drag .csv file to this area to upload data")}
            </p>
            <p className="ant-upload-hint">
              {t("Rows must contain only emails. See example file below")}
            </p>
          </Dragger>
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit">
            {t("Add users to voting")}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default compose(
  withNamespaces(),
  connect(null, mapDispatchToProps)
)(AddUsersCard);
