import React from "react";
import { connect } from "react-redux";
import { Result, Button } from "antd";
import { goBack } from "connected-react-router";
import compose from "../../utils/compose";
import { withNamespaces } from "react-i18next";

const mapStateToProps = (state) => ({ role: state.profile.data.role });
const mapDispatchToProps = (dispatch) => ({
  goBack: () => dispatch(goBack()),
});

export default (Component) => {
  const Wrapper = ({ role, goBack, t }) => {
    if (role !== "admin")
      return (
        <Result
          status="403"
          title={t("This page is only for admins")}
          extra={
            <Button type="primary" onClick={goBack}>
              {t("Go back")}
            </Button>
          }
        />
      );
    return <Component />;
  };

  return compose(
    withNamespaces(),
    connect(mapStateToProps, mapDispatchToProps)
  )(Wrapper);
};
