import React from "react";
import { Form, Input, Button, Card, Upload } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { changeProfileData } from "../../redux/actions/profile";
import { UploadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const ChangeDataCard = ({ name, email }) => {
  const { t } = useTranslation();
  const loading = useSelector(({ app }) => app.loading);
  const dispatch = useDispatch();

  const handleSubmit = (data) => {
    let formData = new FormData();

    if (data.photo)
      formData.append("photo", data.photo.fileList[0].originFileObj);

    formData.append("name", data.name);
    formData.append("email", data.email);

    dispatch(changeProfileData(formData));
  };

  return (
    <Card title={t("Change your data")} bordered={false}>
      <Form
        onFinish={handleSubmit}
        initialValues={{ name, email }}
        layout="vertical"
      >
        <Form.Item name="name" label="Your name">
          <Input placeholder={t("Please input your name")} />
        </Form.Item>
        <Form.Item
          name="email"
          label={t("Your email")}
          rules={[
            {
              type: "email",
              message: t("The input is not valid E-mail!"),
            },
          ]}
        >
          <Input placeholder={t("Please input your email")} />
        </Form.Item>
        <Form.Item name="photo" label={t("Avatar")} valuePropName="photo">
          <Upload
            name="photo"
            listType="picture"
            multiple={false}
            beforeUpload={() => false}
            accept="image/*"
          >
            <Button>
              <UploadOutlined /> {t("Click to select photo")}
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button loading={loading} type="primary" htmlType="submit">
            {t("Update Data")}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ChangeDataCard;
