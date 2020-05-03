import React from "react";
import { Upload, message } from "antd";
import { FileAddOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const handleChange = (info) => {
  const { status } = info.file;
  console.log(info);

  if (status === "uploading") {
    message.loading({ content: "Uploading...", key: "update" });
  }

  if (status === "done") {
    message.success({
      content: info.file.response.message,
      key: "update",
      duration: 3,
    });
  } else if (status === "error") {
    message.error({
      content: info.file.error.message,
      key: "update",
      duration: 4,
    });
  }
};

const beforeUpload = (file) => {
  const isCSV = file.type === "text/csv";
  if (!isCSV) {
    message.error("You can only upload CSV file!");
  }

  const isLessThan2M = file.size / 1024 / 1024 < 1;
  if (!isLessThan2M) {
    message.error("Image must smaller than 1MB!");
  }

  return isCSV && isLessThan2M;
};

const uploadCSV = async (
  { data, file, filename, onError, onSuccess },
  requestFunction
) => {
  const formData = new FormData();
  if (data) {
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
  }
  formData.append(filename, file);
  requestFunction(formData).then(onSuccess).catch(onError);
};

const CSVUploader = ({ hint, requestFn, data, disabled = false }) => {
  return (
    <div>
      <Dragger
        name="file"
        disabled={disabled}
        multiple={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        customRequest={(reqObj) => uploadCSV(reqObj, requestFn)}
        data={data}
      >
        <p className="ant-upload-drag-icon">
          <FileAddOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag .csv file to this area to upload data
        </p>
        <p className="ant-upload-hint">{hint}</p>
      </Dragger>
    </div>
  );
};

export default CSVUploader;
