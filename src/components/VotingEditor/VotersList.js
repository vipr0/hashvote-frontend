import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { List, Avatar, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import API from "../../utils/api";

const VotersList = () => {
  const voters = useSelector((state) => state.voting.dataFromDB.voters);

  return (
    <Card
      title="List of voters"
      extra={`Total voters: ${voters.length ? voters.length : 0}`}
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
                  src={`${API.url}/img/users/${item.user.photo}`}
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

export default VotersList;
