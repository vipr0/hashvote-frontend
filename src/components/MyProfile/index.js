import React from "react";
import { Typography, Row, Col } from "antd";
import { connect } from "react-redux";
import Loader from "../Loader";
import ChangePasswordCard from "./ChangePasswordCard";
import ChangeDataCard from "./ChangeDataCard";
import protectedComponent from "../protectedComponent";
import compose from "../../utils/compose";

const { Title } = Typography;

const mapStateToProps = (state) => ({
  user: state.profile.data,
});

const MyProfile = ({ loading, user }) => {
  return (
    <Loader loading={loading}>
      <Title>Hello, {user.name}</Title>
      <Row gutter={[32, 16]}>
        <Col span={24} sm={12}>
          <ChangeDataCard name={user.name} email={user.email} />
        </Col>
        <Col span={24} sm={12}>
          <ChangePasswordCard />
        </Col>
      </Row>
    </Loader>
  );
};

export default compose(protectedComponent, connect(mapStateToProps))(MyProfile);
