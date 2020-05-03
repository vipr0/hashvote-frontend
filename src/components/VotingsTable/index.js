import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Typography, Row, Col, Popconfirm } from "antd";
import moment from "moment";

import API from "../../utils/api";
import CreateVotingModal from "../CreateVotingModal";

const { Title } = Typography;

const VotingsTable = () => {
  const [votings, setVotings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   API.getVotings().then((data) => {
  //     console.log(data);
  //     setVotings(data);
  //     setIsLoading(false);
  //   });
  // }, [state.result]);

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
      render: (record) =>
        moment(record).format("MMMM Do YYYY, HH:mm:ss"),
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
          onConfirm={() => API.deleteVoting(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button key="3" type="danger">
            Delete{" "}
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      {/* <CreateVotingModal /> */}
      <Row align="middle">
        <Col span={24} md={12}>
          <Title>Table of votings</Title>
        </Col>

        <Col span={24} md={12} align="end">
          <Button 
          // onClick={() => dispatch({ type: "SHOW" })} 
          type="primary">
            Create new voting
          </Button>
        </Col>
      </Row>

      <Table
        dataSource={votings}
        columns={columns}
        loading={isLoading}
        scroll={{ x: 700 }}
      />
    </div>
  );
};

export default VotingsTable;
