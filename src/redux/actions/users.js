import {
  USERS_LOADING,
  USERS_LOADED,
  GET_ALL_USERS,
  DELETE_USERS,
} from "../constants";
import API from "../../utils/api";
import { showError, showMessage } from "./app";

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
    const response = await API.getUsers();
    dispatch({ type: GET_ALL_USERS, payload: response.result });
  } catch (error) {
    dispatch(showError(error.message));
  } finally {
    dispatch(usersLoaded());
  }
};

export const deleteUsers = (users) => async (dispatch) => {
  try {
    await API.deleteUsers(users);
    dispatch({ type: DELETE_USERS, payload: users });
    dispatch(showMessage("success", "Succesfully deleted"));
  } catch (error) {
    dispatch(showMessage("error", error.message));
  }
};
