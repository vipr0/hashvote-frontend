import {
  VOTING_LOADING,
  VOTING_LOADED,
  GET_VOTING_FROM_DB,
  GET_VOTING_FROM_CONTRACT,
  UPDATE_VOTING,
  ARCHIVE_VOTING,
  START_VOTING,
  DELETE_VOTING,
} from "../constants";

const initialState = {
  loading: true,
  dataFromDB: { loading: true },
  dataFromContract: { loading: true },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case VOTING_LOADING:
      return {
        ...state,
        dataFromDB: { loading: true },
        dataFromContract: { loading: true },
      };
    case VOTING_LOADED:
      return {
        ...state,
        dataFromDB: { ...state.dataFromDB, loading: false },
        dataFromContract: { ...state.dataFromContract, loading: false },
      };
    case GET_VOTING_FROM_DB:
      return { ...state, dataFromDB: { ...action.payload, loading: false } };
    case GET_VOTING_FROM_CONTRACT:
      return {
        ...state,
        dataFromContract: { ...action.payload, loading: false },
      };
    case DELETE_VOTING:
      return {
        ...state,
        dataFromDB: {},
        dataFromContract: {},
      };
    default:
      return state;
  }
};
