import React from "react";
import { connect } from "react-redux";
import { Result, Button } from "antd";
import { goBack } from "connected-react-router";

const mapStateToProps = (state) => ({ role: state.profile.data.role });
const mapDispatchToProps = (dispatch) => ({
  goBack: () => dispatch(goBack()),
});

export default (Component) => {
  const Wrapper = ({ role, goBack }) => {
    if (role !== "admin")
      return (
        <Result
          status="403"
          title="This page is only for admins"
          extra={
            <Button type="primary" onClick={goBack}>
              Go back
            </Button>
          }
        />
      );
    return <Component />;
  };

  return connect(mapStateToProps, mapDispatchToProps)(Wrapper);
};
