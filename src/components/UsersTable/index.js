import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Table, Button, Modal, Typography, Row, Col } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import API from "../../utils/api";

const { confirm } = Modal;
const { Title } = Typography;

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    API.getUsers().then((data) => {
      setUsers(data);
      setIsLoading(false);
    });
  }, []);

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure delete this user?",
      icon: <ExclamationCircleOutlined />,
      content: "This action can`t be undone!",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("OK");
      },
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      sorter: (a, b) => a.name.length - b.name.length,
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
    },
    {
      title: "Action",
      key: "action",
      width: 100,
      render: (text, record) => (
        <span>
          <Button onClick={showDeleteConfirm} danger shape="round">
            Delete
          </Button>
        </span>
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
          <Button type="primary">Create new user</Button>
        </Col>
      </Row>

      <Table
        onRow={(rec, rowIndex) => {
          return {
            onClick: (event) => history.push(`/admin/users/${rec.id}`),
          };
        }}
        dataSource={users}
        columns={columns}
        loading={isLoading}
        scroll={{ x: 700 }}
      />
    </div>
  );
};

export default UsersTable;
