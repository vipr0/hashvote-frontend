import React from "react";
import { Button, Form, Input, DatePicker } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import ModalWrapper from "../ModalWrapper";

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: { sm: { span: 16, offset: 8 }, xs: { span: 24 } },
};

const CreateVotingModal = ({ loading }) => {
  const createVoting = async (data) => {
    // try {
    //   dispatch({ type: "LOADING" });
    //   const result = await API.createVoting({
    //     ...data,
    //     endTime: data.endTime.valueOf(),
    //   });
    //   dispatch({ type: "SUCCESS", description: result.message });
    // } catch (error) {
    //   dispatch({ type: "ERROR", description: error.message });
    // }
  };

  return (
    <ModalWrapper title="Create a new voting">
      <Form {...formItemLayout} onFinish={createVoting}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input description!" }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.List name="candidates">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <Form.Item
                    {...(index === 0
                      ? formItemLayout
                      : formItemLayoutWithOutLabel)}
                    key={field.key}
                    label={index === 0 ? "Candidates" : ""}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message:
                            "Please input candidate's name or delete this field.",
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
                <Form.Item {...formItemLayoutWithOutLabel}>
                  <Button type="dashed" onClick={() => add()}>
                    <PlusOutlined /> Add candidate
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>

        <Form.Item
          name="endTime"
          label="End Time"
          rules={[{ required: true, message: "Please select end time!" }]}
        >
          <DatePicker
            showTime={{ format: "HH:mm" }}
            format="Do MMM YYYY, HH:mm:ss"
          />
        </Form.Item>

        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </ModalWrapper>
  );
};

export default CreateVotingModal;
