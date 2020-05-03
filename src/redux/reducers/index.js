import appReducer from "./app";
import profileReducer from "./profile";
import votingsReducer from "./votings";
import votingReducer from "./voting";
import usersReducer from "./users";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

export default (history) =>
  combineReducers({
    profile: profileReducer,
    app: appReducer,
    users: usersReducer,
    votings: votingsReducer,
    voting: votingReducer,
    router: connectRouter(history),
  });
