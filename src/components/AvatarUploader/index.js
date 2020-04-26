import React, { Component } from "react";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import "./style.css";
import API from "../../utils/api";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

export default class AvatarUploader extends Component {
  state = {
    loading: false,
  };

  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  async uploadPhoto({ data, file, filename, onError, onSuccess }) {
    message.loading({ content: "Uploading your photo...", key: "update" });

    const formData = new FormData();
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
    formData.append(filename, file);

    API.uploadPhoto(formData)
      .then((result) => {
        message.success({
          content: result.message,
          key: "update",
          duration: 3,
        });
        onSuccess(result, file);
      })
      .catch((err) => {
        onError(err);
        message.error({ content: err.message, key: "update", duration: 3 });
      });
  }

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <p>Upload</p>
      </div>
    );
    const { imageUrl } = this.state;
    return (
      <Upload
        name="photo"
        listType="picture-card"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
        customRequest={this.uploadPhoto}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    );
  }
}
