import {
  START_LOADING,
  FINISH_LOADING,
  SET_ERROR,
  REMOVE_ERROR,
  SHOW_MESSAGE,
  HIDE_MESSAGE,
} from "../constants";

const initialState = {
  loading: true,
  message: {},
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, loading: true };
    case FINISH_LOADING:
      return { ...state, loading: false };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case REMOVE_ERROR:
      return { ...state, error: action.payload };
    case SHOW_MESSAGE:
      return { ...state, message: action.payload };
    case HIDE_MESSAGE:
      return { ...state, message: {} };
    default:
      return state;
  }
};
