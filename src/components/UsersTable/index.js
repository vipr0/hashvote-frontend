import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Typography, Row, Col, Tag, Popconfirm } from "antd";
import API from "../../utils/api";
import CreateUserModal from "../CreateUserModal";

const { Title } = Typography;

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   API.getUsers().then((data) => {
  //     setUsers(data);
  //     setIsLoading(false);
  //   });
  // }, [result]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      sorter: (a, b) => a.name.length - b.name.length,
      render: (name, record) => (
        <Link to={`/admin/users/${record._id}`}>{name}</Link>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
      sorter: (a, b) => a.role.length - b.role.length,
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
          onConfirm={() => API.deleteUser(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button key="3" type="danger" >
            Delete{" "}
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <Row align="middle">
        <Col span={24} md={12}>
          <Title>Table of users</Title>
        </Col>
        <Col span={24} md={12} align="end">
          <Button
            // onClick={() => dispatch({ type: "SHOW", window: "createUser" })}
            type="primary"
          >
            Create new user
          </Button>
        </Col>
      </Row>

      <CreateUserModal />

      <Table
        dataSource={users}
        columns={columns}
        loading={isLoading}
        scroll={{ x: 700 }}
      />
    </div>
  );
};

export default UsersTable;
