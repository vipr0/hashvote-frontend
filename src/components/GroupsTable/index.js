import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Table, Button, Modal, Typography, Row, Col } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import API from "../../utils/api";

const { confirm } = Modal;
const { Title } = Typography;

const GroupsTable = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await API.getGroups();
      setUsers(result);
      setIsLoading(false);
    };

    fetchUsers();
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
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Members",
      dataIndex: "members",
      key: "members",
      render: (members) => <p>{members.length}</p>,
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
          <Title>Table of groups</Title>
        </Col>
        <Col span={24} md={12} align="end">
          <Button type="primary">Create new group</Button>
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

export default GroupsTable;
