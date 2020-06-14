import React from "react";
import { connect } from "react-redux";
import { Result, Button } from "antd";
import { push } from "connected-react-router";
import { useTranslation } from "react-i18next";

const mapStateToProps = (state) => ({
  user: state.profile.data,
});

const mapDispatchToProps = (dispatch) => ({
  goToLoginPage: () => dispatch(push("/login")),
});

export default (Component) => {
  const Wrapper = ({ user, goToLoginPage }) => {
    const { t } = useTranslation();

    if (!user)
      return (
        <Result
          status="403"
          title={t("You are not logged in")}
          extra={
            <Button type="primary" onClick={goToLoginPage}>
              Log In
            </Button>
          }
        />
      );
    return <Component />;
  };

  return connect(mapStateToProps, mapDispatchToProps)(Wrapper);
};
