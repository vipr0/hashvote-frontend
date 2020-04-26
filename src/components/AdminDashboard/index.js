import React from "react";
import { Link } from "react-router-dom";
import { Typography, Card, Statistic, Row, Col } from "antd";

const { Title } = Typography;
// const { Meta } = Card;

const AdminDashboard = () => {
  return (
    <div>
      <Title>Dashboard</Title>
      <Row gutter={[24, 24]}>
        <Col span={24} lg={8}>
          <Card title="Votings" loading={false}>
            <Row align="middle">
              <Col span={8}  align="middle">
                <Statistic title="All" value={12} />
              </Col>
              <Col span={8} align="middle">
                <Statistic title="Archived" value={12} />
              </Col>
              <Col span={8} align="middle">
                <Link to="/admin/votings">List all</Link>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={24} lg={8}>
          <Card title="Users" loading={false}>
            <Row align="middle">
              <Col span={8} align="middle">
                <Statistic title="All" value={12} />
              </Col>
              <Col span={8} align="middle">
                <Statistic title="Active" value={12} />
              </Col>
              <Col span={8} align="middle">
                <Link to="/admin/users">List all</Link>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={24} lg={8}>
          <Card title="Groups" loading={false}>
            <Row align="middle">
              <Col span={12} align="middle">
                <Statistic title="All" value={12} />
              </Col>
              <Col span={12} align="middle">
                <Link to="/admin/groups">List all</Link>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
