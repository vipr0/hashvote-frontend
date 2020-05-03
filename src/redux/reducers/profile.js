import {
  PROFILE_LOADING,
  PROFILE_LOADED,
  GET_PROFILE,
  LOGIN,
  LOGOUT,
  REGISTER,
  RESET_PASSWORD,
  UPDATE_PROFILE,
} from "../constants";

const initialState = {
  loading: true,
  data: null,
  token: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return { ...state, loading: true };
    case PROFILE_LOADED:
      return { ...state, loading: false };
    case REGISTER:
    case RESET_PASSWORD:
    case LOGIN:
      return {
        ...state,
        token: action.payload.token,
        data: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        data: null,
      };
    case GET_PROFILE:
      return {
        ...state,
        data: action.payload,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
