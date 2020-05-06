import React from "react";
import { Descriptions, Card } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";

const VotingInfoCard = ({ voting }) => {
  return (
    <Card title="Information">
      <Descriptions className="voting-info" column={1}>
        <Descriptions.Item label="ID">{voting._id}</Descriptions.Item>
        <Descriptions.Item label="Created At">
          {moment(voting.createdAt).format("MMMM Do YYYY, HH:mm:ss")}
        </Descriptions.Item>
        <Descriptions.Item label="Created By">
          <Link to={`/admin/users/${voting.createdBy._id}`}>
            {voting.createdBy.name}
          </Link>
        </Descriptions.Item>
        <Descriptions.Item label="End Time">
          {moment(voting.endTime).format("MMMM Do YYYY, HH:mm:ss")}
        </Descriptions.Item>
        <Descriptions.Item label="Contract ID">
          {voting.votingId}
        </Descriptions.Item>
        <Descriptions.Item label="Creation Tx">{voting.tx}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default VotingInfoCard;
