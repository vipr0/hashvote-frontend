import React from "react";
import { List, Card } from "antd";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const EventsList = () => {
  const events = useSelector((state) => state.voting.events.values);
  const { t } = useTranslation();

  return (
    <Card title={t("Voting events")}>
      <List
        className="voters-list-container"
        itemLayout="horizontal"
        dataSource={events}
        size="small"
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={item.event}
              description={item.transactionHash}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default EventsList;
