import React from "react";
import { useSelector } from "react-redux";
import { Result, Button } from "antd";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

export default (Component) => {
  const Wrapper = () => {
    const { t } = useTranslation();
    const user = useSelector(({ profile }) => profile.data);
    const history = useHistory();

    if (!user)
      return (
        <Result
          status="403"
          title={t("You are not logged in")}
          extra={
            <Button type="primary" onClick={() => history.push("/login")}>
              {t("Log In")}
            </Button>
          }
        />
      );
    return <Component />;
  };

  return Wrapper;
};
