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

export const showModal = (name) => {
  return (dispatch) => {
    dispatch({ type: SHOW_MODAL, payload: name });
  };
};

export const hideModal = (name) => {
  return (dispatch) => {
    dispatch({ type: HIDE_MODAL, payload: name });
  };
};

export const loadingModal = (name) => {
  return (dispatch) => {
    dispatch({ type: MODAL_LOADING, payload: name });
  };
};

export const loadedModal = (name) => {
  return (dispatch) => {
    dispatch({ type: MODAL_LOADED, payload: name });
  };
};

export const setModalError = (name, message) => {
  return (dispatch) => {
    dispatch({ type: SET_MODAL_ERROR, payload: { name, message } });
  };
};

export const removeModalError = (name) => {
  return (dispatch) => {
    dispatch({ type: REMOVE_MODAL_ERROR, payload: name });
  };
};

export const setModalResult = (name, result) => {
  return (dispatch) => {
    dispatch({ type: SET_MODAL_RESULT, payload: { name, result } });
  };
};

export const removeModalResult = (name) => {
  return (dispatch) => {
    dispatch({ type: REMOVE_MODAL_RESULT, payload: name });
  };
};
