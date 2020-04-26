import React from "react";
import { Spin } from "antd";
import './style.css'

const Loader = ({ children, loading }) => {
  if (loading) {
    return <Spin spinning={loading} className="spinner" />;
  } else {
    return <div>{children}</div>;
  }
};

export default Loader;
