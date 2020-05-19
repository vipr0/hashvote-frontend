import {
  WALLET_INFO_LOADING,
  GET_WALLET_INFO,
  CONTRACT_INFO_LOADING,
  GET_CONTRACT_INFO,
} from "../constants";
import { Blockchain } from "../../utils/api";

export const getWalletInfo = () => async (dispatch) => {
  dispatch({ type: WALLET_INFO_LOADING });
  const { body } = await Blockchain.getAccount();
  dispatch({ type: GET_WALLET_INFO, payload: body.result });
};

export const getContractInfo = () => async (dispatch) => {
  dispatch({ type: CONTRACT_INFO_LOADING });
  const { body } = await Blockchain.getContract();
  dispatch({ type: GET_CONTRACT_INFO, payload: body.result });
};
