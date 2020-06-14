import React, { useEffect } from "react";
import { Card, Typography } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getContractInfo } from "../../redux/actions/blockchain";
import { useTranslation } from "react-i18next";
import "./style.css";

const { Title } = Typography;

const ContractInfoCard = () => {
  const { loading, address } = useSelector(
    (state) => state.blockchain.contract
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getContractInfo());
  }, []);

  return (
    <Card
      title={t("Smart Contract")}
      loading={loading}
      extra={
        <a href={"https://rinkeby.etherscan.io/address/" + address}>
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

export default ContractInfoCard;
