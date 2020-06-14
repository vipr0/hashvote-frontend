import React from "react";
import { Button, Result, Modal } from "antd";
import { connect } from "react-redux";
import { hideModal, removeModalError } from "../../redux/actions/modals";
import compose from "../../utils/compose";
import { withNamespaces } from "react-i18next";

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
  t,
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
          title={t("Oops, there is an error")}
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

export default compose(
  withNamespaces(),
  connect(null, mapDispatchToProps)
)(ModalWrapper);
