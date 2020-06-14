import React from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { apiUrl } from "../../utils/api";

const UserAvatar = ({ photo = null, size = "default" }) => {
  return (
    <Avatar
      icon={<UserOutlined />}
      src={photo ? `${apiUrl}/img/users/${photo}` : null}
      style={{ marginRight: 12 }}
      size={size}
    />
  );
};

export default UserAvatar;
