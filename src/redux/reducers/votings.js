import {
  VOTINGS_LOADING,
  VOTINGS_LOADED,
  GET_ALL_VOTINGS,
  GET_VOTINGS_BY_USER,
  GET_ACTIVE_VOTINGS,
  CREATE_VOTING,
  DELETE_VOTING,
} from "../constants";

const initialState = {
  loading: false,
  data: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case VOTINGS_LOADING:
      return { ...state, loading: true };
    case VOTINGS_LOADED:
      return { ...state, loading: false };
    case GET_VOTINGS_BY_USER:
    case GET_ALL_VOTINGS:
      return { ...state, data: action.payload };
    case GET_ACTIVE_VOTINGS:
      return {
        ...state,
        data: state.data.filter(
          (voting) => !voting.isArchived && voting.isStarted
        ),
      };
    case CREATE_VOTING:
      return { ...state, data: [...state.data, action.payload] };
    case DELETE_VOTING:
      return {
        ...state,
        data: state.data.filter((voting) => voting._id !== action.payload),
      };
    default:
      return state;
  }
};
