import React from "react";
import { Button, Form, Input, DatePicker } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import ModalWrapper from "../ModalWrapper";
import { useDispatch, useSelector } from "react-redux";
import { createVoting } from "../../redux/actions/voting";
import { useTranslation } from "react-i18next";

const CreateVotingModal = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const modal = useSelector(({ modals }) => modals.createVoting);

  return (
    <ModalWrapper
      modalName="createVoting"
      result={modal.result}
      visible={modal.visible}
      error={modal.error}
      title={t("Create a new voting")}
    >
      <Form layout="vertical" onFinish={(data) => dispatch(createVoting(data))}>
        <Form.Item
          name="title"
          label={t("Title")}
          rules={[{ required: true, message: t("Please input title!") }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label={t("Description")}
          rules={[{ required: true, message: t("Please input description!") }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.List name="candidates">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Form.Item
                    key={field.key}
                    label={index === 0 ? t("Candidates") : ""}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: t(
                            "Please input candidate's name or delete this field."
                          ),
                        },
                      ]}
                      noStyle
                    >
                      <Input
                        placeholder="candidate name"
                        style={{ width: "85%" }}
                      />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        style={{ margin: "0 8px" }}
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()}>
                    <PlusOutlined /> {t("Add candidate")}
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>

        <Form.Item
          name="endTime"
          label={t("End Time")}
          rules={[{ required: true, message: t("Please select end time!") }]}
        >
          <DatePicker
            showTime={{ format: "HH:mm" }}
            format="Do MMM YYYY, HH:mm:ss"
          />
        </Form.Item>

        <Form.Item>
          <Button loading={modal.loading} type="primary" htmlType="submit">
            {t("Create")}
          </Button>
        </Form.Item>
      </Form>
    </ModalWrapper>
  );
};

export default CreateVotingModal;
