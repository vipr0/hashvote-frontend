import {
  VOTING_LOADING,
  VOTING_LOADED,
  GET_VOTING_FROM_DB,
  GET_VOTING_FROM_CONTRACT,
  UPDATE_VOTING,
  ARCHIVE_VOTING,
  START_VOTING,
  DELETE_VOTING,
  CREATE_VOTING,
} from "../constants";
import API from "../../utils/api";
import { showError } from "./app";
import {
  loadingModal,
  loadedModal,
  setModalError,
  setModalResult,
} from "./modals";
import moment from "moment";

export const votingLoading = () => {
  return async (dispatch) => {
    dispatch({ type: VOTING_LOADING });
  };
};

export const votingLoaded = () => {
  return async (dispatch) => {
    dispatch({ type: VOTING_LOADED });
  };
};

export const getVoting = (id) => async (dispatch) => {
  try {
    dispatch(votingLoading());
    const db = await API.getVotingDB(id);
    dispatch({ type: GET_VOTING_FROM_DB, payload: db.result });
    const contract = await API.getVotingContract(id);
    dispatch({ type: GET_VOTING_FROM_CONTRACT, payload: contract.result });
  } catch (error) {
    dispatch(showError(error.message));
  } finally {
    dispatch(votingLoaded());
  }
};

export const createVoting = (data) => async (dispatch) => {
  try {
    dispatch(votingLoading());
    dispatch(loadingModal("createVoting"));
    const response = await API.createVoting({
      ...data,
      endTime: moment(data.endTime).valueOf(),
    });
    dispatch(setModalResult("createVoting", response.message));
    dispatch({ type: CREATE_VOTING, payload: response.result });
  } catch (error) {
    dispatch(setModalError("createVoting", error.message));
  } finally {
    dispatch(loadedModal("createVoting"));
    dispatch(votingLoaded());
  }
};

export const deleteVoting = (id) => async (dispatch) => {
  try {
    await API.deleteVoting(id);
    dispatch({ type: DELETE_VOTING, payload: id });
  } catch (error) {
    dispatch(showError(error.message));
  }
};
