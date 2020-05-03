import appReducer from "./app";
import profileReducer from "./profile";
import votingsReducer from "./votings";
import votingReducer from "./voting";
import usersReducer from "./users";
import modalsReducer from "./modals";
import userReducer from "./user";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

export default (history) =>
  combineReducers({
    profile: profileReducer,
    app: appReducer,
    modals: modalsReducer,
    users: usersReducer,
    user: userReducer,
    votings: votingsReducer,
    voting: votingReducer,
    router: connectRouter(history),
  });
