import React, { useEffect } from "react";
import { Card, Typography } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getWalletInfo } from "../../redux/actions/blockchain";
import './style.css'

const { Title } = Typography;

const WalletInfoCard = () => {
  const { loading, account, balance } = useSelector(
    (state) => state.blockchain.wallet
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWalletInfo());
  }, []);

  return (
    <Card
      title="Wallet"
      loading={loading}
      extra={
        <a href={"https://kovan.etherscan.io/address/" + account}>More info</a>
      }
      className="info-card"
    >
      <Title level={4}>Address</Title>
      <p>{account}</p>
      <Title level={4}>Balance (ETH)</Title>
      <p>{balance}</p>
      <a href="https://faucet.kovan.network/">Recharge</a>
    </Card>
  );
};

export default WalletInfoCard;
