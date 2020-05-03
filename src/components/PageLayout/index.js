import React from "react";
import Navbar from "../../components/Navbar";
import { Layout } from "antd";
import "./style.css";

const { Content } = Layout;

const PageLayout = ({ children }) => {
  return (
    <Layout className="page-layout">
      <Navbar />
      <Content>
        <div className="page-content">
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default PageLayout;
