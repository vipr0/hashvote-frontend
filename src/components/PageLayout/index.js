import React from "react";
import Header from "../../components/Header";
import { Layout } from "antd";
import "./style.css";

const { Content } = Layout;

const PageLayout = ({ children }) => {
  return (
    <Layout className="page-layout">
      <Header />
      <Content>
        <div className="page-content">
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default PageLayout;
