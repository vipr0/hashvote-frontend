import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Table, Button, Tag, Popconfirm, Row } from "antd";
import { getAllUsers, deleteUsers } from "../../redux/actions/users";
import { deleteUser } from "../../redux/actions/user";
import getColumnSearchProps from "../../utils/getColumnSearchProps";

const UsersTable = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector(({ users }) => users.loading);
  const users = useSelector(({ users }) => users.data);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const onSelectChange = (keys, rows) => {
    setSelectedRows(rows);
  };

  const handleDeleteUsers = () => {
    dispatch(deleteUsers(selectedRows.map((row) => row._id)));
  };

  const rowSelection = {
    onChange: onSelectChange,
    hideDefaultSelections: true,
  };

  const columns = [
    {
      title: t("Name"),
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
      title: t("Email"),
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      ...getColumnSearchProps("email"),
    },
    {
      title: t("Role"),
      dataIndex: "role",
      key: "role",
      width: 100,
      filters: [
        {
          text: t("Admin"),
          value: "admin",
        },
        {
          text: t("Voter"),
          value: "voter",
        },
      ],
      onFilter: (value, user) => user.role.indexOf(value) === 0,
      sorter: (a, b) => a.role.localeCompare(b.role),
    },
    {
      title: t("Verified"),
      dataIndex: "isVerified",
      key: "isVerified",
      width: 100,
      render: (value) =>
        value ? <Tag color="success">Yes</Tag> : <Tag color="error">No</Tag>,
      filters: [
        {
          text: t("Yes"),
          value: true,
        },
        {
          text: t("No"),
          value: false,
        },
      ],
      onFilter: (value, user) => user.isVerified === value,
    },
    {
      title: t("Action"),
      key: "action",
      width: 100,
      render: (text, record) => (
        <Popconfirm
          title={t("Are you sure delete this user?")}
          onConfirm={() => dispatch(deleteUser(record._id))}
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
    <Fragment>
      <Row className="selection-buttons" hidden={!selectedRows.length}>
        <Button danger onClick={handleDeleteUsers}>
          {t("Delete selected users")}
        </Button>
      </Row>
      <Table
        rowSelection={rowSelection}
        dataSource={users}
        columns={columns}
        loading={loading}
        scroll={{ x: 700 }}
      />
    </Fragment>
  );
};

export default UsersTable;
