import React, { useEffect } from "react";
import Loader from "../Loader";
import { Typography, Row, Col } from "antd";
import EditDataCard from "./EditDataCard";
import UserDataCard from "./UserDataCard";
import ActionButtons from "./ActionButtons";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getUser } from "../../redux/actions/user";
import compose from "../../utils/compose";
import protectedComponent from "../protectedComponent";
import adminComponent from "../adminComponent";

const { Title } = Typography;

const UserEditor = () => {
  const { userId } = useParams();
  const user = useSelector(({ user }) => user.data);
  const loading = useSelector(({ user }) => user.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(userId));
  }, []);

  return (
    <Loader loading={loading}>
      <Row>
        <Col span={24} sm={12}>
          <Title>{user.name}</Title>
        </Col>
        <Col span={24} sm={12}>
          <ActionButtons />
        </Col>
      </Row>

      <Row gutter={[32, 32]}>
        <Col span={24} md={12}>
          <UserDataCard user={user} />
        </Col>

        <Col span={24} md={12}>
          <EditDataCard
            initialValues={{
              name: user.name,
              email: user.email,
              role: user.role,
            }}
          />
        </Col>
      </Row>
    </Loader>
  );
};

export default compose(protectedComponent, adminComponent)(UserEditor);
