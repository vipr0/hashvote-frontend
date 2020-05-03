import appReducer from "./app";
import authReducer from "./auth";
import votingsReducer from "./votings";
import votingReducer from "./voting";
import usersReducer from "./users";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

export default (history) =>
  combineReducers({
    currentUser: authReducer,
    app: appReducer,
    users: usersReducer,
    votings: votingsReducer,
    voting: votingReducer,
    router: connectRouter(history),
  });
