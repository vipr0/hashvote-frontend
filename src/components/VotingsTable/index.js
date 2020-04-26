import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Table, Button, Modal, Typography, Row, Col } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import API from "../../utils/api";
import CreateVotingModal from "../CreateVotingModal";
import ModalWrapper from "../ModalWrapper";

const { confirm } = Modal;
const { Title } = Typography;

const VotingsTable = () => {
  const [votings, setVotings] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    API.getVotings().then((data) => {
      console.log(data);
      setVotings(data);
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
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 150,
      sorter: (a, b) => a.title.length - b.title.length,
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
      <ModalWrapper
        visible={modalVisible}
        handleHide={() => setModalVisible(false)}
      >
        <CreateVotingModal />
      </ModalWrapper>

      <Row align="middle">
        <Col span={24} md={12}>
          <Title>Table of voters</Title>
        </Col>

        <Col span={24} md={12} align="end">
          <Button onClick={() => setModalVisible(true)} type="primary">
            Create new voting
          </Button>
        </Col>
      </Row>

      <Table
        onRow={(rec, rowIndex) => {
          return {
            onClick: (event) => history.push(`/admin/votings/${rec._id}`),
          };
        }}
        dataSource={votings}
        columns={columns}
        loading={isLoading}
        scroll={{ x: 700 }}
      />
    </div>
  );
};

export default VotingsTable;
