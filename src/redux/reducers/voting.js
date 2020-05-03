import {
  GET_VOTING_FROM_DB,
  GET_VOTING_FROM_CONTRACT,
  LOAD_VOTING,
  GETTING_VOTING_FAILED,
} from "../constants";

const initialState = {
  dataFromDB: { loading: true },
  dataFromContract: { loading: true },
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_VOTING:
      return {
        ...state,
        dataFromDB: { loading: true },
        dataFromContract: { loading: true },
      };
    case GET_VOTING_FROM_DB:
      return { ...state, dataFromDB: { loading: false, ...action.payload } };
    case GET_VOTING_FROM_CONTRACT:
      return {
        ...state,
        dataFromContract: { loading: false, ...action.payload },
      };
    case GETTING_VOTING_FAILED:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
