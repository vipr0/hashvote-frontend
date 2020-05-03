import {
  USER_LOADING,
  USER_LOADED,
  CREATE_USER,
  GET_USER,
  UPDATE_USER,
  DELETE_USER,
} from "../constants";
import API from "../../utils/api";
import { showMessage, showError } from "./app";
import {
  setModalResult,
  setModalError,
  loadingModal,
  loadedModal,
} from "./modals";

export const userLoading = () => {
  return async (dispatch) => {
    dispatch({ type: USER_LOADING });
  };
};

export const userLoaded = () => {
  return async (dispatch) => {
    dispatch({ type: USER_LOADED });
  };
};

export const getUser = (id) => async (dispatch) => {
  try {
    dispatch(userLoading());
    const response = await API.getUser(id);
    dispatch({ type: GET_USER, payload: response.result });
    dispatch(showMessage("success", response.message));
  } catch (error) {
    dispatch(showError(error.message));
  } finally {
    dispatch(userLoaded());
  }
};

export const updateUser = (id, data) => async (dispatch) => {
  try {
    dispatch(userLoading());
    const response = await API.updateUser(id, data);
    dispatch({ type: UPDATE_USER, payload: response.result });
    dispatch(showMessage("success", response.message));
  } catch (error) {
    dispatch(showMessage("error", error.message));
  } finally {
    dispatch(userLoaded());
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch(userLoading());
    await API.deleteUser(id);
    dispatch({ type: DELETE_USER, payload: id });
    dispatch(showMessage("success", "Successfully deleted"));
  } catch (error) {
    dispatch(showMessage("error", error.message));
  } finally {
    dispatch(userLoaded());
  }
};

export const createUser = (data) => async (dispatch) => {
  try {
    dispatch(userLoading());
    dispatch(loadingModal("createUser"));
    const response = await API.createUser(data);
    dispatch(setModalResult("createUser", response.message));
    dispatch({ type: CREATE_USER, payload: response.result });
  } catch (error) {
    dispatch(setModalError("createUser", error.message));
  } finally {
    dispatch(loadedModal("createUser"));
    dispatch(userLoaded());
  }
};

export const resetUserPassword = (email) => async (dispatch) => {
  try {
    const response = await API.forgotPassword({ email });
    dispatch(showMessage("success", response.message));
  } catch (error) {
    dispatch(showMessage("error", error.message));
  }
};
