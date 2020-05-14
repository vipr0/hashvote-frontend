import { VOTINGS_LOADING, VOTINGS_LOADED, GET_ALL_VOTINGS } from "../constants";
import { Voting } from "../../utils/api";
import { showError } from "./app";
import { addKeysToArray } from "../../utils/uniqueKeys";

export const votingsLoading = () => {
  return async (dispatch) => {
    dispatch({ type: VOTINGS_LOADING });
  };
};

export const votingsLoaded = () => {
  return async (dispatch) => {
    dispatch({ type: VOTINGS_LOADED });
  };
};

export const getAllVotings = () => async (dispatch) => {
  try {
    dispatch(votingsLoading());
    const { body } = await Voting.getAll();
    dispatch({ type: GET_ALL_VOTINGS, payload: addKeysToArray(body.result) });
  } catch (error) {
    dispatch(showError(error.message));
  } finally {
    dispatch(votingsLoaded());
  }
};
