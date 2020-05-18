import {
  USERS_LOADING,
  USERS_LOADED,
  GET_ALL_USERS,
  DELETE_USERS,
  CREATE_USERS,
} from "../constants";
import { User } from "../../utils/api";
import { showError, showMessage } from "./app";
import { addKeysToArray } from "../../utils/uniqueKeys";
import {
  loadingModal,
  setModalError,
  setModalResult,
  loadedModal,
} from "./modals";

export const usersLoading = () => {
  return async (dispatch) => {
    dispatch({ type: USERS_LOADING });
  };
};

export const usersLoaded = () => {
  return async (dispatch) => {
    dispatch({ type: USERS_LOADED });
  };
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch(usersLoading());
    const { body } = await User.getAll();
    dispatch({ type: GET_ALL_USERS, payload: addKeysToArray(body.result) });
  } catch (error) {
    dispatch(showError(error.message));
  } finally {
    dispatch(usersLoaded());
  }
};

export const importUsers = (data) => async (dispatch) => {
  try {
    dispatch(usersLoading());
    dispatch(loadingModal("importUsers"));
    const { body } = await User.import(data);
    dispatch(setModalResult("importUsers", body.message));
    dispatch({
      type: CREATE_USERS,
      payload: addKeysToArray(body.result.newUsers),
    });
  } catch (error) {
    dispatch(setModalError("importUsers", error.message));
  } finally {
    dispatch(loadedModal("importUsers"));
    dispatch(usersLoaded());
  }
};

export const deleteUsers = (users) => async (dispatch) => {
  try {
    await User.deleteMany({ users });
    dispatch({ type: DELETE_USERS, payload: users });
    dispatch(showMessage("success", "Succesfully deleted"));
  } catch (error) {
    dispatch(showMessage("error", error.message));
  }
};
