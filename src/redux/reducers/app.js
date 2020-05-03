import {
  SHOW_ERROR,
  HIDE_ERROR,
  SHOW_MESSAGE,
  HIDE_MESSAGE,
  SET_ADMIN_TAB,
} from "../constants";

const initialState = {
  message: { type: null, text: null },
  error: null,
  adminTab: "votings",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ERROR:
      return { ...state, error: action.payload };
    case HIDE_ERROR:
      return { ...state, error: null };
    case SHOW_MESSAGE:
      return { ...state, message: action.payload };
    case HIDE_MESSAGE:
      return { ...state, message: {} };
    case SET_ADMIN_TAB:
      return { ...state, adminTab: action.payload };
    default:
      return state;
  }
};
