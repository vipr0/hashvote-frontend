import React from "react";
import { Descriptions, Card } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loader from "../Loader";

const VotingInfoCard = ({ voting }) => {
  const { t } = useTranslation();

  if (!voting.createdBy) return <Loader loading={true} />;

  return (
    <Card title={t("Information")}>
      <Descriptions className="voting-info" column={1}>
        <Descriptions.Item label="ID">{voting._id}</Descriptions.Item>
        <Descriptions.Item label={t("Created At")}>
          {moment(voting.createdAt).format("MMMM Do YYYY, HH:mm:ss")}
        </Descriptions.Item>
        <Descriptions.Item label={t("Created By")}>
          <Link to={`/admin/users/${voting.createdBy._id}`}>
            {voting.createdBy.name}
          </Link>
        </Descriptions.Item>
        <Descriptions.Item label={t("End Time")}>
          {moment(voting.endTime).format("MMMM Do YYYY, HH:mm:ss")}
        </Descriptions.Item>
        <Descriptions.Item label="Contract ID">
          {voting.votingId}
        </Descriptions.Item>
        <Descriptions.Item label={t("Creation Tx")}>
          {voting.tx}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default VotingInfoCard;
