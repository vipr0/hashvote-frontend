import { push } from "connected-react-router";
import { Profile } from "../../utils/api";
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
import { showMessage } from "./app";

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
      const { body } = await Profile.login(data);
      dispatch(showMessage("success", body.message));
      dispatch({ type: LOGIN, payload: body.result });
      dispatch(push("/votings"));
    } catch ({ message }) {
      dispatch(showMessage("error", message));
    } finally {
      dispatch(profileLoaded());
    }
  };
};

export const signUp = (token, data) => {
  return async (dispatch) => {
    try {
      dispatch(profileLoading());
      const { body } = await Profile.activate(token, data);
      dispatch(showMessage("success", body.message));
      dispatch({ type: REGISTER, payload: body.result });
      dispatch(push("/votings"));
    } catch ({ message }) {
      dispatch(showMessage("error", message));
    } finally {
      dispatch(profileLoaded());
    }
  };
};

export const forgotPassword = (data) => async (dispatch) => {
  try {
    dispatch(profileLoading());
    const { body } = await Profile.forgotPassword(data);
    dispatch(showMessage("success", body.message));
  } catch ({ message }) {
    dispatch(showMessage("error", message));
  } finally {
    dispatch(profileLoaded());
  }
};

export const resetPassword = (token, data) => async (dispatch) => {
  try {
    dispatch(profileLoading());
    const { body } = await Profile.resetPassword(token, data);
    dispatch(showMessage("success", body.message));
    dispatch({ type: RESET_PASSWORD, payload: body.result });
    dispatch(push("/votings"));
  } catch ({ message }) {
    dispatch(showMessage("error", message));
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
      const { body } = await Profile.get();
      dispatch({ type: GET_PROFILE, payload: body.result });
    } catch ({ message }) {
      dispatch({ type: GET_PROFILE, payload: null });
    } finally {
      dispatch(profileLoaded());
    }
  };
};

export const changeProfileData = (formData) => async (dispatch) => {
  try {
    dispatch(profileLoading());
    const { body } = await Profile.changeData(formData);
    dispatch({ type: UPDATE_PROFILE, payload: body.result });
    dispatch(showMessage("success", body.message));
  } catch ({ message }) {
    dispatch(showMessage("error", message));
  } finally {
    dispatch(profileLoaded());
  }
};

export const changeProfilePassword = (data) => async (dispatch) => {
  try {
    dispatch(profileLoading());
    const { body } = await Profile.changePassword(data);
    dispatch({ type: UPDATE_PROFILE, payload: body.result });
    dispatch(showMessage("success", body.message));
  } catch ({ message }) {
    dispatch(showMessage("error", message));
  } finally {
    dispatch(profileLoaded());
  }
};
