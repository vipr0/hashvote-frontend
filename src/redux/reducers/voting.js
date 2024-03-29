import {
  VOTING_LOADING,
  VOTING_LOADED,
  GET_VOTING_FROM_DB,
  GET_VOTING_FROM_CONTRACT,
  GET_VOTING_EVENTS,
  UPDATE_VOTING,
  DELETE_VOTING,
  START_VOTING,
  ARCHIVE_VOTING,
} from "../constants";

const initialState = {
  dataFromDB: { loading: true },
  dataFromContract: { loading: true },
  events: { loading: true },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case VOTING_LOADING:
      return initialState;
    case VOTING_LOADED:
      return {
        ...state,
        dataFromDB: { ...state.dataFromDB, loading: false },
        dataFromContract: { ...state.dataFromContract, loading: false },
      };
    case START_VOTING:
      return {
        ...state,
        dataFromDB: { ...state.dataFromDB, loading: false, isStarted: true },
      };
    case ARCHIVE_VOTING:
      return {
        ...state,
        dataFromDB: { ...state.dataFromDB, loading: false, isArchived: true },
      };
    case UPDATE_VOTING:
    case GET_VOTING_FROM_DB:
      return { ...state, dataFromDB: { ...action.payload, loading: false } };
    case GET_VOTING_FROM_CONTRACT:
      return {
        ...state,
        dataFromContract: { ...action.payload, loading: false },
      };
    case GET_VOTING_EVENTS:
      return {
        ...state,
        events: { values: action.payload, loading: false },
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
