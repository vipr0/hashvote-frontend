import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Result, Button } from "antd";
import { useTranslation } from "react-i18next";

export default (Component) => {
  const Wrapper = ({ goBack }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const role = useSelector((state) => state.profile.data.role);

    if (role !== "admin")
      return (
        <Result
          status="403"
          title={t("This page is only for admins")}
          extra={
            <Button type="primary" onClick={() => dispatch(goBack())}>
              {t("Go back")}
            </Button>
          }
        />
      );
    return <Component />;
  };

  return Wrapper;
};
