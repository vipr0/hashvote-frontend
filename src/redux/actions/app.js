import {
  SHOW_ERROR,
  HIDE_ERROR,
  SHOW_MESSAGE,
  HIDE_MESSAGE,
  SET_ADMIN_TAB,
} from "../constants";

export const showError = (message) => {
  return (dispatch) => {
    dispatch({ type: SHOW_ERROR, payload: message });
  };
};

export const hideError = () => {
  return (dispatch) => {
    dispatch({ type: HIDE_ERROR });
  };
};

export const showMessage = (type, message) => (dispatch) => {
  dispatch({ type: SHOW_MESSAGE, payload: { type, message } });
  setTimeout(() => {
    dispatch({ type: HIDE_MESSAGE });
  }, 5000);
};

export const setAdminTab = (tab) => {
  return (dispatch) => {
    dispatch({ type: SET_ADMIN_TAB, payload: tab });
  };
};
