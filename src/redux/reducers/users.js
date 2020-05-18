import {
  USERS_LOADING,
  USERS_LOADED,
  GET_ALL_USERS,
  CREATE_USER,
  DELETE_USER,
  DELETE_USERS,
  CREATE_USERS,
} from "../constants";

const initialState = {
  loading: true,
  data: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERS_LOADING:
      return { ...state, loading: true };
    case USERS_LOADED:
      return { ...state, loading: false };
    case GET_ALL_USERS:
      return { ...state, data: action.payload };
    case CREATE_USER:
    case CREATE_USERS:
      return { ...state, data: [...state.data, ...action.payload] };
    case DELETE_USER:
      return {
        ...state,
        data: state.data.filter((user) => user._id !== action.payload),
      };
    case DELETE_USERS:
      return {
        ...state,
        data: state.data.filter((user) => !action.payload.includes(user._id)),
      };
    default:
      return state;
  }
};
