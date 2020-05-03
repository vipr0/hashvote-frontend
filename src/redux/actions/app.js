import {
  START_LOADING,
  SET_ERROR,
  FINISH_LOADING,
  SHOW_MESSAGE,
  HIDE_MESSAGE,
} from "../constants";

export const loading = () => {
  return { type: START_LOADING };
};

export const ready = () => {
  return { type: FINISH_LOADING };
};

export const setError = (message) => {
  return (dispatch) => {
    dispatch({ type: SET_ERROR, payload: message });
  };
};

export const showMessage = (type, message) => (dispatch) => {
  dispatch({ type: SHOW_MESSAGE, payload: { type, message } });
  setTimeout(() => {
    dispatch({ type: HIDE_MESSAGE });
  }, 5000);
};
