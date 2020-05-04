import React from "react";
import { Form, Input, Button } from "antd";
import { connect } from "react-redux";
import ModalWrapper from "../ModalWrapper";
import { startVoting } from "../../redux/actions/voting";
import { useParams } from "react-router-dom";

const mapStateToProps = (state) => ({
  modal: state.modals.startVoting,
});

const mapDispatchToProps = (dispatch) => ({
  startVoting: (id, data) => dispatch(startVoting(id, data)),
});

const StartVotingModal = ({ modal, startVoting }) => {
  const { votingId } = useParams();
  return (
    <ModalWrapper
      modalName="startVoting"
      result={modal.result}
      visible={modal.visible}
      error={modal.error}
      title="Enter admin token to start voting"
    >
      <Form onFinish={(data) => startVoting(votingId, data)}>
        <Form.Item
          name="token"
          label="Admin Token"
          rules={[{ required: true, message: "Please input admin token!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button loading={modal.loading} type="primary" htmlType="submit">
            Confirm
          </Button>
        </Form.Item>
      </Form>
    </ModalWrapper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(StartVotingModal);
