import React, { useState } from "react";
import { Modal, Button, Result } from "antd";

const ModalWrapper = ({ visible, handleHide, children }) => {
  const [loading, setIsLoading] = useState(false);
  const [result, setResult] = useState({});

  const handleClose = () => {
    handleHide();
    setResult({});
  };

  const renderResult = () => {
    const { status, title, description } = result;

    return (
      <div>
        <Result status={status} title={title} subTitle={description} />
        <Button
          onClick={status === "error" ? () => setResult({}) : handleClose}
        >
          {status === "error" ? "Retry" : "Close"}
        </Button>
      </div>
    );
  };

  const handleRequest = async (requestFunction, values) => {
    try {
      setIsLoading(true);
      const result = await requestFunction(values);

      setResult(result);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setResult({
        status: "error",
        title: "Oops! There is an error",
        description: error.message,
      });
    }
  };

  return (
    <Modal
      visible={visible}
      title="Vote for a candidate"
      onCancel={handleHide}
      footer={null}
    >
      {result.status
        ? renderResult()
        : React.cloneElement(children, { handleRequest, loading })}
    </Modal>
  );
};

export default ModalWrapper;
