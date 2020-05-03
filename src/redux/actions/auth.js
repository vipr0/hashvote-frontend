import { push } from "connected-react-router";
import { loading, setError, ready, showMessage } from "./app";
import API from "../../utils/api";
import { LOGIN, GET_CURRENT_USER, LOGOUT, RESET_PASSWORD } from "../constants";

export const logIn = (data) => {
  return async (dispatch) => {
    try {
      dispatch(loading());
      const response = await API.login(data);
      dispatch(showMessage("success", response.message));
      dispatch({ type: LOGIN, payload: response.result });
      dispatch(push("/votings"));
    } catch (error) {
      dispatch(showMessage("error", error.message));
    } finally {
      dispatch(ready());
    }
  };
};

export const forgotPassword = (data) => async (dispatch) => {
  try {
    dispatch(loading());
    const response = await API.forgotPassword(data);
    dispatch(showMessage("success", response.message));
  } catch (error) {
    dispatch(showMessage("error", error.message));
  } finally {
    dispatch(ready());
  }
};

export const resetPassword = (token, data) => async (dispatch) => {
  try {
    dispatch(loading());
    const response = await API.resetPassword(token, data);
    dispatch(showMessage("success", response.message));
    dispatch({ type: RESET_PASSWORD, payload: response.result });
    dispatch(push("/votings"));
  } catch (error) {
    dispatch(showMessage("error", error.message));
  } finally {
    dispatch(ready());
  }
};

export const logOut = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOGOUT });
      dispatch(push("/login"));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};

export const getCurrentUser = () => {
  return async (dispatch) => {
    try {
      dispatch(loading());
      const response = await API.getMe();
      dispatch({ type: GET_CURRENT_USER, payload: response.result });
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(ready());
    }
  };
};
