import React from "react";
import { Form, Input, Button, Card, Select } from "antd";
import { connect } from "react-redux";
import { updateUser } from "../../redux/actions/user";
import { useParams } from "react-router-dom";

const { Option } = Select;

const mapDispatchToProps = (dispatch) => ({
  updateUserData: (id, data) => dispatch(updateUser(id, data)),
});

const EditDataCard = ({ initialValues, updateUserData }) => {
  const { userId } = useParams();

  return (
    <Card title="Edit user data">
      <Form
        onFinish={(data) => updateUserData(userId, data)}
        initialValues={initialValues}
        layout="vertical"
      >
        <Form.Item name="name" label="Name">
          <Input placeholder="Please input user`s name" />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input placeholder="Please input user`s email" />
        </Form.Item>
        <Form.Item name="role" label="Role">
          <Select placeholder="Select a role">
            <Option value="voter">Voter</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit">
            Update User`s Data
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default connect(null, mapDispatchToProps)(EditDataCard);
