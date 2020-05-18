import {
  USER_LOADING,
  USER_LOADED,
  CREATE_USER,
  GET_USER,
  UPDATE_USER,
  DELETE_USER,
} from "../constants";
import { User, Profile } from "../../utils/api";
import { showMessage, showError } from "./app";
import {
  setModalResult,
  setModalError,
  loadingModal,
  loadedModal,
} from "./modals";
import { addKey, addKeysToArray } from "../../utils/uniqueKeys";

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
    const { body } = await User.getOne(id);
    dispatch({ type: GET_USER, payload: body.result });
  } catch (error) {
    dispatch(showError(error.message));
  } finally {
    dispatch(userLoaded());
  }
};

export const updateUser = (id, data) => async (dispatch) => {
  try {
    dispatch(userLoading());
    const { body } = await User.update(id, data);
    dispatch({ type: UPDATE_USER, payload: body.result });
    dispatch(showMessage("success", body.message));
  } catch (error) {
    dispatch(showMessage("error", error.message));
  } finally {
    dispatch(userLoaded());
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch(userLoading());
    await User.deleteOne(id);
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
    const { body } = await User.create(data);
    dispatch(setModalResult("createUser", body.message));
    dispatch({
      type: CREATE_USER,
      payload: addKeysToArray(body.result.newUsers),
    });
  } catch (error) {
    dispatch(setModalError("createUser", error.message));
  } finally {
    dispatch(loadedModal("createUser"));
    dispatch(userLoaded());
  }
};

export const resetUserPassword = (email) => async (dispatch) => {
  try {
    const { body } = await Profile.forgotPassword({ email });
    dispatch(showMessage("success", body.message));
  } catch (error) {
    dispatch(showMessage("error", error.message));
  }
};
