import React from "react";
import moment from "moment";
import { Descriptions, Card } from "antd";

const UserDataCard = ({ user }) => {
  return (
    <Card title="User data">
      <Descriptions column={1} bordered>
        <Descriptions.Item label="ID">{user._id}</Descriptions.Item>
        <Descriptions.Item label="Verified">
          {user.isVerified ? "Yes" : "No"}
        </Descriptions.Item>
        <Descriptions.Item label="Role">{user.role}</Descriptions.Item>
        <Descriptions.Item label="Last password change">
          {moment(user.passwordChangedAt).fromNow()}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default UserDataCard;
