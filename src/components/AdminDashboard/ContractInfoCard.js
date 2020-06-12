import React, { useEffect } from "react";
import { Card, Typography } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getContractInfo } from "../../redux/actions/blockchain";
import "./style.css";
import { withNamespaces } from "react-i18next";

const { Title } = Typography;

const ContractInfoCard = ({ t }) => {
  const { loading, address } = useSelector(
    (state) => state.blockchain.contract
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContractInfo());
  }, []);

  return (
    <Card
      title={t("Smart Contract")}
      loading={loading}
      extra={
        <a href={"https://kovan.etherscan.io/address/" + address}>
          {t("More info")}
        </a>
      }
      className="info-card"
    >
      <Title level={4}>{t("Address")}</Title>
      <p>{address}</p>
    </Card>
  );
};

export default withNamespaces()(ContractInfoCard);
