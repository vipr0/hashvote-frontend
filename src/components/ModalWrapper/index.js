import React from "react";
import { Button, Result, Modal } from "antd";

const ModalWrapper = ({ result, visible, children, title }) => {
  const handleHide = () => {
    // dispatch({ type: "HIDE" });
  };

  const handleRetry = () => {
    // dispatch({ type: "RETRY" });
  };

  const renderResult = () => {
    const { status, title, description } = result;

    return (
      <div>
        <Result status={status} title={title} subTitle={description} />
        <Button onClick={status === "success" ? handleHide : handleRetry}>
          {status === "success" ? "Close" : "Retry"}
        </Button>
      </div>
    );
  };

  return (
    <Modal visible={visible} title={title} onCancel={handleHide} footer={null}>
      {result.status ? renderResult() : children}
    </Modal>
  );
};

export default ModalWrapper;
