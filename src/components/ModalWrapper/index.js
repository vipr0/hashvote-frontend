import React from "react";
import { Button, Result, Modal } from "antd";
import { connect } from "react-redux";
import { hideModal, removeModalError } from "../../redux/actions/modals";

const mapDispatchToProps = (dispatch) => ({
  hideModal: (name) => dispatch(hideModal(name)),
  removeModalError: (name) => dispatch(removeModalError(name)),
});

const ModalWrapper = ({
  modalName,
  result,
  visible,
  error,
  children,
  title,
  hideModal,
  removeModalError,
}) => {
  if (error) {
    return (
      <Modal
        visible={visible}
        title={title}
        onCancel={() => hideModal(modalName)}
        footer={null}
      >
        <Result
          status="error"
          title="Oops, there is an error"
          subTitle={error}
        />
        <Button onClick={() => removeModalError(modalName)}>Retry</Button>
      </Modal>
    );
  }

  if (result) {
    return (
      <Modal
        visible={visible}
        title={title}
        onCancel={() => hideModal(modalName)}
        footer={null}
      >
        <Result status="success" title="Success!" subTitle={result} />
        <Button onClick={() => hideModal(modalName)}>Close</Button>
      </Modal>
    );
  }

  return (
    <Modal
      visible={visible}
      title={title}
      onCancel={() => hideModal(modalName)}
      footer={null}
    >
      {children}
    </Modal>
  );
};

export default connect(null, mapDispatchToProps)(ModalWrapper);
