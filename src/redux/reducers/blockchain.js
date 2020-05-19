import {
  WALLET_INFO_LOADING,
  GET_WALLET_INFO,
  CONTRACT_INFO_LOADING,
  GET_CONTRACT_INFO,
} from "../constants";

const inititalState = {
  wallet: { loading: true },
  contract: { loading: true },
};

export default (state = inititalState, action) => {
  switch (action.type) {
    case WALLET_INFO_LOADING:
      return { ...state, wallet: { loading: true } };
    case CONTRACT_INFO_LOADING:
      return { ...state, contract: { loading: true } };
    case GET_WALLET_INFO:
      return { ...state, wallet: { loading: false, ...action.payload } };
    case GET_CONTRACT_INFO:
      return { ...state, contract: { loading: false, ...action.payload } };
    default:
      return state;
  }
};
