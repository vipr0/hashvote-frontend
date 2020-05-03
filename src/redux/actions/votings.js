import {
  VOTINGS_LOADING,
  VOTINGS_LOADED,
  GET_ALL_VOTINGS,
  GET_VOTINGS_BY_USER,
  GET_ACTIVE_VOTINGS,
  VOTING_LOADED,
} from "../constants";
import API from "../../utils/api";
import { showError } from "./app";

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
    const response = await API.getVotings();
    dispatch({ type: GET_ALL_VOTINGS, payload: response.result });
  } catch (error) {
    dispatch(showError(error.message));
  } finally {
    dispatch(votingsLoaded());
  }
};