import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Table, Button, Popconfirm } from "antd";
import moment from "moment";
import { deleteVoting } from "../../redux/actions/voting";
import { getAllVotings } from "../../redux/actions/votings";
import getColumnSearchProps from "../../utils/getColumnSearchProps";
import compose from "../../utils/compose";
import { withNamespaces } from "react-i18next";

const mapStateToProps = (state) => ({
  loading: state.votings.loading,
  votings: state.votings.data,
});

const mapDispatchToProps = (dispatch) => ({
  getAllVotings: () => dispatch(getAllVotings()),
  deleteVoting: (id) => dispatch(deleteVoting(id)),
});

const VotingsTable = ({ loading, votings, getAllVotings, deleteVoting, t }) => {
  useEffect(() => {
    getAllVotings();
  }, []);

  const columns = [
    {
      title: t("Title"),
      dataIndex: "title",
      key: "title",
      width: 150,
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (title, record) => (
        <Link to={`/admin/votings/${record._id}`}>{title}</Link>
      ),
      ...getColumnSearchProps("title"),
    },
    {
      title: t("Description"),
      dataIndex: "description",
      key: "description",
      width: 300,
      ...getColumnSearchProps("description"),
    },
    {
      title: t("Created at"),
      dataIndex: "createdAt",
      key: "createdAt",
      width: 100,
      render: (record) => moment(record).format("MMMM Do YYYY, HH:mm:ss"),
      sorter: (a, b) =>
        moment(a.createdAt).valueOf() - moment(b.createdAt).valueOf(),
    },
    {
      title: t("Number of voters"),
      dataIndex: "votersCount",
      key: "votersCount",
      width: 100,
      sorter: (a, b) => a.votersCount - b.votersCount,
    },
    {
      title: t("Action"),
      key: "action",
      width: 100,
      render: (text, record) => (
        <Popconfirm
          title={t("Are you sure delete this voting?")}
          onConfirm={() => deleteVoting(record._id)}
          okText={t("Yes")}
          cancelText={t("No")}
        >
          <Button key="3" danger shape="round">
            {t("Delete")}
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

export default compose(
  withNamespaces(),
  connect(mapStateToProps, mapDispatchToProps)
)(VotingsTable);
