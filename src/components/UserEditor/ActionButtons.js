import React from "react";
import { Button, Space } from "antd";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { deleteUser, resetUserPassword } from "../../redux/actions/user";
import compose from "../../utils/compose";
import { withNamespaces } from "react-i18next";

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

const ActionButtons = ({ email, userId, resetPassword, deleteUser, t }) => {
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
        {t("Reset password")}
      </Button>
      <Button key="delete" type="danger" onClick={() => deleteUser(userId)}>
        {t("Delete")}
      </Button>
    </Space>
  );
};

export default compose(
  withNamespaces(),
  connect(mapStateToProps, mapDispatchToProps)
)(ActionButtons);
