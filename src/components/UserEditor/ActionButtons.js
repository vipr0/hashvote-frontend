import React from "react";
import { Button, Space } from "antd";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

const mapDispatchToProps = (dispatch) => ({
  resetPassword: () => {},
  deleteUser: () => {},
});

const ActionButtons = ({ resetPassword, deleteUser }) => {
  const { userId } = useParams();

  return (
    <Space
      size="middle"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Button key="reset-password" type="primary" onClick={resetPassword}>
        Reset password
      </Button>
      <Button key="delete" type="danger" onClick={deleteUser}>
        Delete
      </Button>
    </Space>
  );
};

export default connect(null, mapDispatchToProps)(ActionButtons);
