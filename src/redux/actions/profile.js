import { push } from "connected-react-router";
import { loading, setError, ready, showMessage } from "./app";
import API from "../../utils/api";
import {
  LOGIN,
  GET_CURRENT_USER,
  LOGOUT,
  RESET_PASSWORD,
  UPDATE_PROFILE,
} from "../constants";

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
      dispatch(showMessage("success", "Successfully logged out"));
    } catch (error) {
      dispatch(showMessage("error", error.message));
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

export const changeProfileData = (data) => async (dispatch) => {
  try {
    dispatch(loading());

    let formData = new FormData();
    if (data.photo)
      formData.append("photo", data.photo.fileList[0].originFileObj);
    formData.append("name", data.name);
    formData.append("email", data.email);
    const response = await API.changeProfileData(formData);
    
    dispatch({ type: UPDATE_PROFILE, payload: response.result });
    dispatch(showMessage("success", response.message));
  } catch (error) {
    dispatch(showMessage("error", error.message));
    dispatch(setError(error.message));
  } finally {
    dispatch(ready());
  }
};

export const changeProfilePassword = (data) => async (dispatch) => {
  try {
    dispatch(loading());
    const response = await API.changeProfilePassword(data);
    dispatch({ type: UPDATE_PROFILE, payload: response.result });
    dispatch(showMessage("success", response.message));
  } catch (error) {
    dispatch(showMessage("error", error.message));
    dispatch(setError(error.message));
  } finally {
    dispatch(ready());
  }
};

export const changeAvatar = (data) => async (dispatch) => {
  try {
    dispatch(loading());
    const response = await API.changeAvatar(data);
    dispatch({ type: UPDATE_PROFILE, payload: response.result });
    dispatch(showMessage("success", response.message));
  } catch (error) {
    dispatch(showMessage("error", error.message));
    dispatch(setError(error.message));
  } finally {
    dispatch(ready());
  }
};
