import React from "react";
import { Button, Result, Modal } from "antd";
import { useDispatch } from "react-redux";
import { hideModal, removeModalError } from "../../redux/actions/modals";
import { useTranslation } from "react-i18next";

const ModalWrapper = ({
  modalName,
  result,
  visible,
  error,
  children,
  title,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  if (error) {
    return (
      <Modal
        visible={visible}
        title={title}
        onCancel={() => dispatch(hideModal(modalName))}
        footer={null}
      >
        <Result
          status="error"
          title={t("Oops, there is an error")}
          subTitle={error}
        />
        <Button onClick={() => dispatch(removeModalError(modalName))}>
          Retry
        </Button>
      </Modal>
    );
  }

  if (result) {
    return (
      <Modal
        visible={visible}
        title={title}
        onCancel={() => dispatch(hideModal(modalName))}
        footer={null}
      >
        <Result status="success" title="Success!" subTitle={result} />
        <Button onClick={() => dispatch(hideModal(modalName))}>Close</Button>
      </Modal>
    );
  }

  return (
    <Modal
      visible={visible}
      title={title}
      onCancel={() => dispatch(hideModal(modalName))}
      footer={null}
    >
      {children}
    </Modal>
  );
};

export default ModalWrapper;
