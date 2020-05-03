import { LOGIN, LOGOUT, REGISTER, RESET_PASSWORD } from "./constants";
import { setAuthToken, removeAuthToken } from "../utils/cookies";

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
