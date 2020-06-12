import React, { useEffect } from "react";
import { Card, Typography } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getWalletInfo } from "../../redux/actions/blockchain";
import "./style.css";
import { withNamespaces } from "react-i18next";

const { Title } = Typography;

const WalletInfoCard = ({ t }) => {
  const { loading, account, balance } = useSelector(
    (state) => state.blockchain.wallet
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWalletInfo());
  }, []);

  return (
    <Card
      title={t("Wallet")}
      loading={loading}
      extra={
        <a href={"https://kovan.etherscan.io/address/" + account}>
          {t("More info")}
        </a>
      }
      className="info-card"
    >
      <Title level={4}>{t("Address")}</Title>
      <p>{account}</p>
      <Title level={4}>{t("Balance (ETH)")}</Title>
      <p>{balance}</p>
      <a href="https://faucet.kovan.network/">{t("Recharge")}</a>
    </Card>
  );
};

export default withNamespaces()(WalletInfoCard);
