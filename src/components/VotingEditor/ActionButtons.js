import React from "react";
import { Button, Space, Popconfirm } from "antd";
import { useDispatch } from "react-redux";
import { showModal } from "../../redux/actions/modals";
import { archiveVoting, deleteVoting } from "../../redux/actions/voting";
import { push } from "connected-react-router";

const ActionButtons = ({ voting }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteVoting(voting._id));
    dispatch(push("/admin"));
  };

  return (
    <Space size="middle">
      <Button
        key="1"
        type="primary"
        disabled={voting.isStarted || voting.isArchived}
        onClick={() => dispatch(showModal("startVoting"))}
      >
        Start
      </Button>
      <Popconfirm
        title="Are you sure archive this voting?"
        onConfirm={() => dispatch(archiveVoting(voting._id))}
        okText="Yes"
        cancelText="No"
      >
        <Button disabled={voting.isArchived} key="2">
          Archive
        </Button>
      </Popconfirm>
      <Popconfirm
        title="Are you sure delete this voting?"
        onConfirm={handleDelete}
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

export default ActionButtons;
