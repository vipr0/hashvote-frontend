import React from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { apiUrl } from "../../utils/api";

const UserAvatar = ({ user, size = "default" }) => {
  return (
    <Avatar
      icon={<UserOutlined />}
      src={user.photo ? `${apiUrl}/img/users/${user.photo}` : null}
      style={{ marginRight: 12 }}
      size={size}
    />
  );
};

export default UserAvatar;
