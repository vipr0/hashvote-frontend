import { push } from "connected-react-router";
import API from "../../utils/api";
import {
  PROFILE_LOADING,
  PROFILE_LOADED,
  GET_PROFILE,
  LOGIN,
  LOGOUT,
  RESET_PASSWORD,
  UPDATE_PROFILE,
  REGISTER,
} from "../constants";
import { showMessage, showError } from "./app";

export const profileLoading = () => {
  return async (dispatch) => {
    dispatch({ type: PROFILE_LOADING });
  };
};

export const profileLoaded = () => {
  return async (dispatch) => {
    dispatch({ type: PROFILE_LOADED });
  };
};

export const logIn = (data) => {
  return async (dispatch) => {
    try {
      dispatch(profileLoading());
      const response = await API.login(data);
      dispatch(showMessage("success", response.message));
      dispatch({ type: LOGIN, payload: response.result });
      dispatch(push("/votings"));
    } catch (error) {
      dispatch(showMessage("error", error.message));
    } finally {
      dispatch(profileLoaded());
    }
  };
};

export const signUp = (token, data) => {
  return async (dispatch) => {
    try {
      dispatch(profileLoading());
      const response = await API.finishRegister(token, data);
      dispatch(showMessage("success", response.message));
      dispatch({ type: REGISTER, payload: response.result });
      dispatch(push("/votings"));
    } catch (error) {
      dispatch(showMessage("error", error.message));
    } finally {
      dispatch(profileLoaded());
    }
  };
};

export const forgotPassword = (data) => async (dispatch) => {
  try {
    dispatch(profileLoading());
    const response = await API.forgotPassword(data);
    dispatch(showMessage("success", response.message));
  } catch (error) {
    dispatch(showMessage("error", error.message));
  } finally {
    dispatch(profileLoaded());
  }
};

export const resetPassword = (token, data) => async (dispatch) => {
  try {
    dispatch(profileLoading());
    const response = await API.resetPassword(token, data);
    dispatch(showMessage("success", response.message));
    dispatch({ type: RESET_PASSWORD, payload: response.result });
    dispatch(push("/votings"));
  } catch (error) {
    dispatch(showMessage("error", error.message));
  } finally {
    dispatch(profileLoaded());
  }
};

export const logOut = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT });
    dispatch(push("/login"));
    dispatch(showMessage("success", "Successfully logged out"));
  };
};

export const getCurrentUser = () => {
  return async (dispatch) => {
    try {
      dispatch(profileLoading());
      const response = await API.getMe();
      dispatch({ type: GET_PROFILE, payload: response.result });
    } catch (error) {
      dispatch(showMessage("error", "You are not logged in"));
    } finally {
      dispatch(profileLoaded());
    }
  };
};

export const changeProfileData = (formData) => async (dispatch) => {
  try {
    dispatch(profileLoading());
    const response = await API.changeProfileData(formData);
    dispatch({ type: UPDATE_PROFILE, payload: response.result });
    dispatch(showMessage("success", response.message));
  } catch (error) {
    dispatch(showMessage("error", error.message));
  } finally {
    dispatch(profileLoaded());
  }
};

export const changeProfilePassword = (data) => async (dispatch) => {
  try {
    dispatch(profileLoading());
    const response = await API.changeProfilePassword(data);
    dispatch({ type: UPDATE_PROFILE, payload: response.result });
    dispatch(showMessage("success", response.message));
  } catch (error) {
    dispatch(showMessage("error", error.message));
  } finally {
    dispatch(profileLoaded());
  }
};

export const changeAvatar = (data) => async (dispatch) => {
  try {
    dispatch(profileLoading());
    const response = await API.changeAvatar(data);
    dispatch({ type: UPDATE_PROFILE, payload: response.result });
    dispatch(showMessage("success", response.message));
  } catch (error) {
    dispatch(showMessage("error", error.message));
  } finally {
    dispatch(profileLoaded());
  }
};
