import { LOGIN, LOGOUT, REGISTER, RESET_PASSWORD } from "./constants";
import { setAuthToken, removeAuthToken } from "../utils/cookies";
import { hideError } from "./actions/app";

export const cookiesMiddleware = () => (next) => (action) => {
  if (
    action.type === LOGIN ||
    action.type === REGISTER ||
    action.type === RESET_PASSWORD
  ) {
    setAuthToken(action.payload.token);
  }

  if (action.type === LOGOUT) removeAuthToken();

  return next(action);
};

export const hideErrorWhenRedirect = ({ dispatch }) => (next) => (action) => {
  if (action.type === "@@router/LOCATION_CHANGE") {
    dispatch(hideError());
  }

  return next(action);
};
