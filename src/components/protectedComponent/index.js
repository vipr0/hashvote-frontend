import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({ user: state.profile.data });

export default (Component) => {
  const Wrapper = ({ user }) => {
    if (!user) return <p>Log in to view this content</p>;
    return <Component />;
  };

  return connect(mapStateToProps)(Wrapper);
};
