import React from "react";
import { Card, Select, Typography } from "antd";
import { useTranslation } from "react-i18next";

const { Paragraph } = Typography;
const { Option } = Select;

const OtherCard = () => {
  const { i18n } = useTranslation();

  return (
    <Card title="Other settings">
      <Paragraph>Language</Paragraph>
      <Select
        defaultValue="ua"
        onChange={(data) => i18n.changeLanguage(data)}
        trigger={["click"]}
      >
        <Option value="ua">🇺🇦 Українська</Option>
        <Option value="ru">🇷🇺 Русский</Option>
        <Option value="en">🇺🇸 English</Option>
      </Select>
    </Card>
  );
};

export default OtherCard;
