import React from "react";
import { Form, Card, Typography, Row, Col } from "antd";
import Logo from "../../assets/logo.svg";
import "./style.css";

const { Title } = Typography;

const FormWrapper = ({ children, fn, title }) => {
  return (
    <Row justify="center" align="middle">
      <Col>
        <Card>
          <Form onFinish={fn} style={{ textAlign: "center" }}>
            <img src={Logo} alt="Logo" className="form-logo" />
            <Title level={4} style={{marginBottom: 16}}>{title}</Title>
            {children}
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default FormWrapper;
