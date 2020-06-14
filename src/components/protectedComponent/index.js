import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Result, Button } from "antd";
import { push } from "connected-react-router";
import { useTranslation } from "react-i18next";

export default (Component) => {
  const Wrapper = () => {
    const { t } = useTranslation();
    const user = useSelector(({ profile }) => profile.data);
    const dispatch = useDispatch();

    if (!user)
      return (
        <Result
          status="403"
          title={t("You are not logged in")}
          extra={
            <Button type="primary" onClick={() => dispatch(push("/login"))}>
              {t("Log In")}
            </Button>
          }
        />
      );
    return <Component />;
  };

  return Wrapper;
};
