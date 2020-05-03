import { LOGIN, LOGOUT, GET_CURRENT_USER, UPDATE_PROFILE } from "../constants";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
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
    case GET_CURRENT_USER:
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
