import {
  LOAD_VOTINGS,
  GETTING_VOTINGS_SUCCESS,
  GETTING_VOTINGS_FAILED,
  GET_ALL_VOTINGS,
} from "../constants";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_VOTINGS:
      return { ...state, loading: true };
    case GETTING_VOTINGS_SUCCESS:
      return { ...state, loading: false };
    case GETTING_VOTINGS_FAILED:
      return { ...state, loading: false, error: action.payload };
    case GET_ALL_VOTINGS:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};
