import React from "react";
import { useParams } from "react-router-dom";
import { Input, Upload, Form, Button, Card } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { addUsersToVoting } from "../../redux/actions/voting";

const { Dragger } = Upload;

const mapDispatchToProps = (dispatch) => ({
  addUsersToVoting: (id, data) => {
    let formData = new FormData();
    formData.append("adminToken", data.adminToken);
    formData.append("file", data.file.fileList[0].originFileObj);
    dispatch(addUsersToVoting(id, formData));
  },
});

const AddUsersCard = ({ addUsersToVoting }) => {
  const { votingId } = useParams();
  return (
    <Card title="Add users to voting" bordered={false}>
      <Form
        onFinish={(data) => addUsersToVoting(votingId, data)}
        layout="vertical"
      >
        <Form.Item
          name="adminToken"
          label="Admin token"
          rules={[
            {
              required: true,
              message: "Please input your admin token",
            },
          ]}
        >
          <Input.Password placeholder="Enter admin token first" />
        </Form.Item>
        <Form.Item
          name="file"
          label="CSV file"
          rules={[
            {
              required: true,
              message: "Please add csv file with users emails",
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
              Click or drag .csv file to this area to upload data
            </p>
            <p className="ant-upload-hint">
              Rows must contain only emails. See example file below
            </p>
          </Dragger>
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit">
            Add users to voting
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default connect(null, mapDispatchToProps)(AddUsersCard);
