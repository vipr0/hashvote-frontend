import React from "react";
import { List, Card } from "antd";
import { useSelector } from "react-redux";
import { withNamespaces } from "react-i18next";

const EventsList = ({ t }) => {
  const events = useSelector((state) => state.voting.events.values);

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

export default withNamespaces()(EventsList);
