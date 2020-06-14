import React from "react";
import { Card, Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { changeVotingData } from "../../redux/actions/voting";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { TextArea } = Input;

const ChangeVotingDataCard = ({ initialValues }) => {
  const { votingId } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Card title={t("Change voting data")}>
      <Form
        onFinish={(data) => dispatch(changeVotingData(votingId, data))}
        initialValues={initialValues}
        layout="vertical"
      >
        <Form.Item name="title" label={t("Title")}>
          <Input placeholder={t("Please input voting title")} />
        </Form.Item>
        <Form.Item name="description" label={t("Description")}>
          <TextArea
            placeholder={t("Please input voting description")}
            autoSize
          />
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit">
            {t("Update Voting Data")}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ChangeVotingDataCard;
