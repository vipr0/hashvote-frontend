import {
  USER_LOADING,
  USER_LOADED,
  GET_USER,
  UPDATE_USER,
  DELETE_USER,
} from "../constants";

const initialState = {
  loading: true,
  data: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return { ...state, loading: true };
    case USER_LOADED:
      return { ...state, loading: false };
    case UPDATE_USER:
    case GET_USER:
      return { ...state, data: action.payload };
    case DELETE_USER:
      return { ...state, data: {} };
    default:
      return state;
  }
};
