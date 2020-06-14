import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { List, Card } from "antd";
import UserAvatar from "../UserAvatar";

const VotersList = () => {
  const voters = useSelector((state) => state.voting.dataFromDB.voters);
  const { t } = useTranslation();

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
              avatar={<UserAvatar photo={item.user.photo} />}
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

export default VotersList;
