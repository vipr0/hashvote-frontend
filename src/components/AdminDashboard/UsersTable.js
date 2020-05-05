import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Tag, Popconfirm } from "antd";
import { connect } from "react-redux";
import { getAllUsers } from "../../redux/actions/users";
import { deleteUser } from "../../redux/actions/user";
import getColumnSearchProps from "../../utils/getColumnSearchProps";

const mapStateToProps = (state) => ({
  loading: state.users.loading,
  users: state.users.data,
});

const mapDispatchToProps = (dispatch) => ({
  getAllUsers: () => dispatch(getAllUsers()),
  deleteUser: (id) => dispatch(deleteUser(id)),
});

const UsersTable = ({ getAllUsers, deleteUser, loading, users }) => {
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name, record) => (
        <Link to={`/admin/users/${record._id}`}>{name}</Link>
      ),
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      ...getColumnSearchProps("email"),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 100,
      filters: [
        {
          text: "Admin",
          value: "admin",
        },
        {
          text: "Voter",
          value: "voter",
        },
      ],
      onFilter: (value, user) => user.role.indexOf(value) === 0,
      sorter: (a, b) => a.role.localeCompare(b.role),
    },
    {
      title: "Verified",
      dataIndex: "isVerified",
      key: "isVerified",
      width: 100,
      render: (value) =>
        value ? <Tag color="success">Yes</Tag> : <Tag color="error">No</Tag>,
      filters: [
        {
          text: "Yes",
          value: true,
        },
        {
          text: "No",
          value: false,
        },
      ],
      onFilter: (value, user) => user.isVerified === value,
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (text, record) => (
        <Popconfirm
          title="Are you sure delete this task?"
          onConfirm={() => deleteUser(record._id)}
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
      dataSource={users}
      columns={columns}
      loading={loading}
      scroll={{ x: 700 }}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
