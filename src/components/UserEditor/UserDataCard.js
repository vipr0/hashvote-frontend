import React from "react";
import moment from "moment";
import { Descriptions, Card } from "antd";
import { withNamespaces } from "react-i18next";

const UserDataCard = ({ user, t }) => {
  return (
    <Card title={t("User data")}>
      <Descriptions column={1} bordered>
        <Descriptions.Item label="ID">{user._id}</Descriptions.Item>
        <Descriptions.Item label={t("Verified")}>
          {user.isVerified ? t("Yes") : t("No")}
        </Descriptions.Item>
        <Descriptions.Item label={t("Role")}>{user.role}</Descriptions.Item>
        <Descriptions.Item label={t("Last password change")}>
          {moment(user.passwordChangedAt).fromNow()}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default withNamespaces()(UserDataCard);
