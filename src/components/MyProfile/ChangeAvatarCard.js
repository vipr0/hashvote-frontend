import React from "react";
import { Card } from "antd";
import AvatarUploader from "../AvatarUploader";

const ChangeAvatarCard = () => {
  return (
    <Card title="Change your avatar" bordered={false}>
      <AvatarUploader />
    </Card>
  );
};

export default ChangeAvatarCard;
