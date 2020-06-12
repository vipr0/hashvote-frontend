import React from "react";
import { List, Card } from "antd";
import { useSelector } from "react-redux";

const EventsList = () => {
  const events = useSelector((state) => state.voting.events.values);

  return (
    <Card title="Voting events">
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
