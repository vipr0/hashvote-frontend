import React from "react";
import { Result, Button } from "antd";
import { useTranslation } from "react-i18next";

const ErrorIndicator = ({ error, hideError }) => {
  const { t } = useTranslation();

  return (
    <Result
      status="404"
      title={t("Oops, there is an error")}
      subTitle={error}
      extra={<Button onClick={hideError}>Go back</Button>}
    />
  );
};

export default ErrorIndicator;
