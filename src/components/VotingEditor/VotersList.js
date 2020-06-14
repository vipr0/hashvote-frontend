import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { List, Avatar, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { apiUrl } from "../../utils/api";
import { withNamespaces } from "react-i18next";

const VotersList = ({ t }) => {
  const voters = useSelector((state) => state.voting.dataFromDB.voters);

  return (
    <Card
      title={t("List of voters")}
      extra={`${t("Total voters")}: ${voters.length ? voters.length : 0}`}
    >
      <List
        className="voters-list-container"
        itemLayout="horizontal"
        dataSource={voters}
        size="small"
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  icon={<UserOutlined />}
                  src={`${apiUrl}/img/users/${item.user.photo}`}
                />
              }
              title={
                <Link to={`/admin/users/${item.user.id}`}>
                  {item.user.name}
                </Link>
              }
              description={item.user.email}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default withNamespaces()(VotersList);
