import React from "react";
import { Button, Space } from "antd";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { deleteUser, resetUserPassword } from "../../redux/actions/user";

const mapStateToProps = (state) => ({
  email: state.user.data.email,
  userId: state.user.data._id,
});

const mapDispatchToProps = (dispatch) => ({
  resetPassword: (email) => {
    dispatch(resetUserPassword(email));
  },
  deleteUser: (id) => {
    dispatch(deleteUser(id));
    dispatch(push("/admin"));
  },
});

const ActionButtons = ({ email, userId, resetPassword, deleteUser }) => {
  return (
    <Space
      size="middle"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Button
        key="reset-password"
        type="primary"
        onClick={() => resetPassword(email)}
      >
        Reset password
      </Button>
      <Button key="delete" type="danger" onClick={() => deleteUser(userId)}>
        Delete
      </Button>
    </Space>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionButtons);
