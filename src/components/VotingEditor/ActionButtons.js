import React from "react";
import { Button, Space, Popconfirm } from "antd";
import { useDispatch } from "react-redux";
import { showModal } from "../../redux/actions/modals";
import { archiveVoting, deleteVoting } from "../../redux/actions/voting";
import { useHistory } from "react-router-dom";

const ActionButtons = ({ voting }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = () => {
    dispatch(deleteVoting(voting._id));
    history.push("/admin");
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
