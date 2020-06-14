import React from "react";
import { Form, Input, Button } from "antd";
import { connect } from "react-redux";
import ModalWrapper from "../ModalWrapper";
import { startVoting } from "../../redux/actions/voting";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const mapStateToProps = (state) => ({
  modal: state.modals.startVoting,
});

const mapDispatchToProps = (dispatch) => ({
  startVoting: (id, data) => dispatch(startVoting(id, data)),
});

const StartVotingModal = ({ modal, startVoting }) => {
  const { votingId } = useParams();
  const { t } = useTranslation();

  return (
    <ModalWrapper
      modalName="startVoting"
      result={modal.result}
      visible={modal.visible}
      error={modal.error}
      title={t("Enter admin token to start voting")}
    >
      <Form layout="vertical" onFinish={(data) => startVoting(votingId, data)}>
        <Form.Item
          name="token"
          label={t("Admin Token")}
          rules={[{ required: true, message: t("Please input admin token!") }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button loading={modal.loading} type="primary" htmlType="submit">
            {t("Confirm")}
          </Button>
        </Form.Item>
      </Form>
    </ModalWrapper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(StartVotingModal);
