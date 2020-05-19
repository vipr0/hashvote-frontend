import React, { useEffect } from "react";
import { Card, Typography } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getContractInfo } from "../../redux/actions/blockchain";
import './style.css'

const { Title } = Typography;

const ContractInfoCard = () => {
  const { loading, address } = useSelector(
    (state) => state.blockchain.contract
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContractInfo());
  }, []);

  return (
    <Card
      title="Smart Contract"
      loading={loading}
      extra={
        <a href={"https://kovan.etherscan.io/address/" + address}>More info</a>
      }
      className="info-card"
    >
      <Title level={4}>Address</Title>
      <p>{address}</p>
    </Card>
  );
};

export default ContractInfoCard;
