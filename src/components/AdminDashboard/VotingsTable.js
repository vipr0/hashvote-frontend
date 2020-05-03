import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Popconfirm } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import { deleteVoting } from "../../redux/actions/voting";
import { getAllVotings } from "../../redux/actions/votings";
const mapStateToProps = (state) => ({
  loading: state.votings.loading,
  votings: state.votings.data,
});

const mapDispatchToProps = (dispatch) => ({
  getAllVotings: () => dispatch(getAllVotings()),
  deleteVoting: (id) => dispatch(deleteVoting(id)),
});

const VotingsTable = ({ loading, votings, getAllVotings, deleteVoting }) => {
  useEffect(() => {
    getAllVotings();
  }, []);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 150,
      sorter: (a, b) => a.title.length - b.title.length,
      render: (title, record) => (
        <Link to={`/admin/votings/${record._id}`}>{title}</Link>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 300,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 100,
      render: (record) => moment(record).format("MMMM Do YYYY, HH:mm:ss"),
      sorter: (a, b) => {
        console.log(a);
        return a.createdAt.length - b.createdAt.length;
      },
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (text, record) => (
        <Popconfirm
          title="Are you sure delete this voting?"
          onConfirm={() => deleteVoting(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button key="3" danger shape="round">
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <Table
      dataSource={votings}
      columns={columns}
      loading={loading}
      scroll={{ x: 700 }}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(VotingsTable);