import React from "react";
import { Button, Space, Popconfirm } from "antd";
import { connect } from "react-redux";
import { showModal } from "../../redux/actions/modals";
import { archiveVoting, deleteVoting } from "../../redux/actions/voting";
import { push } from "connected-react-router";

const mapDispatchToProps = (dispatch) => ({
  openModal: () => dispatch(showModal("startVoting")),
  archiveVoting: (id) => dispatch(archiveVoting(id)),
  deleteVoting: (id) => {
    dispatch(deleteVoting(id));
    dispatch(push("/admin"));
  },
});

const ActionButtons = ({ voting, openModal, archiveVoting, deleteVoting }) => {
  return (
    <Space size="middle">
      <Button
        key="1"
        type="primary"
        disabled={voting.isStarted || voting.isArchived}
        onClick={() => openModal(voting._id)}
      >
        Start
      </Button>
      <Popconfirm
        title="Are you sure archive this voting?"
        onConfirm={() => archiveVoting(voting._id)}
        okText="Yes"
        cancelText="No"
      >
        <Button disabled={voting.isArchived} key="2">
          Archive
        </Button>
      </Popconfirm>
      <Popconfirm
        title="Are you sure delete this voting?"
        onConfirm={() => deleteVoting(voting._id)}
        okText="Yes"
        cancelText="No"
        style={{ textAlign: "center" }}
      >
        <Button key="3" type="danger">
          Delete
        </Button>
      </Popconfirm>
    </Space>
  );
};

export default connect(null, mapDispatchToProps)(ActionButtons);
