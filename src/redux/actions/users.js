import { USERS_LOADING, USERS_LOADED, GET_ALL_USERS } from "../constants";
import API from "../../utils/api";
import { showError } from "./app";

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
