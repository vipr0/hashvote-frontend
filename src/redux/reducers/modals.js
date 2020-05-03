import {
  MODAL_LOADING,
  MODAL_LOADED,
  HIDE_MODAL,
  SHOW_MODAL,
  SET_MODAL_ERROR,
  REMOVE_MODAL_ERROR,
  SET_MODAL_RESULT,
  REMOVE_MODAL_RESULT,
} from "../constants";

const initialState = {
  createVoting: {},
  startVoting: {},
  createUser: {},
  vote: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        [action.payload]: { ...state[action.payload], visible: true },
      };
    case HIDE_MODAL:
      return {
        ...state,
        [action.payload]: {},
      };
    case MODAL_LOADING:
      return {
        ...state,
        [action.payload]: { ...state[action.payload], loading: true },
      };
    case MODAL_LOADED:
      return {
        ...state,
        [action.payload]: { ...state[action.payload], loading: false },
      };
    case SET_MODAL_ERROR:
      return {
        ...state,
        [action.payload.name]: {
          ...state[action.payload.name],
          error: action.payload.message,
        },
      };
    case REMOVE_MODAL_ERROR:
      return {
        ...state,
        [action.payload]: { ...state[action.payload], error: null },
      };
    case SET_MODAL_RESULT:
      return {
        ...state,
        [action.payload.name]: {
          ...state[action.payload.name],
          result: action.payload.result,
        },
      };
    case REMOVE_MODAL_RESULT:
      return {
        ...state,
        [action.payload]: { ...state[action.payload], message: null },
      };
    default:
      return state;
  }
};
