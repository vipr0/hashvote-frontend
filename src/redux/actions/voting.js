import {
  VOTING_LOADING,
  VOTING_LOADED,
  GET_VOTING_FROM_DB,
  GET_VOTING_FROM_CONTRACT,
  UPDATE_VOTING,
  DELETE_VOTING,
  CREATE_VOTING,
  START_VOTING,
  ARCHIVE_VOTING,
} from "../constants";
import API from "../../utils/api";
import { showError, showMessage } from "./app";
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

export const voteForCandidate = (votingId, data) => async (dispatch) => {
  try {
    dispatch(loadingModal("vote"));
    const response = await API.voteForCandidate(votingId, data);
    dispatch(
      setModalResult(
        "vote",
        `Successfully votes. You can check your transaction by link:
        https://kovan.etherscan.io/tx/${response.result.tx}`
      )
    );
  } catch (error) {
    dispatch(setModalError("vote", error.message));
  } finally {
    dispatch(loadedModal("vote"));
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
    dispatch(
      setModalResult(
        "createVoting",
        `${response.message}. Your admin token ${response.adminToken}`
      )
    );
    dispatch({ type: CREATE_VOTING, payload: response.result });
  } catch (error) {
    dispatch(setModalError("createVoting", error.message));
  } finally {
    dispatch(loadedModal("createVoting"));
    dispatch(votingLoaded());
  }
};

export const addUsersToVoting = (id, formData) => async (dispatch) => {
  try {
    const response = await API.addUsersToVoting(id, formData);
    dispatch(showMessage("success", response.message));
  } catch (error) {
    dispatch(showMessage("error", error.message));
  } finally {
  }
};

export const changeVotingData = (id, data) => async (dispatch) => {
  try {
    const response = await API.updateVoting(id, data);
    dispatch({ type: UPDATE_VOTING, payload: response.result });
    dispatch(showMessage("success", response.message));
  } catch (error) {
    dispatch(showMessage("error", error.message));
  } finally {
  }
};

export const startVoting = (id, data) => async (dispatch) => {
  try {
    dispatch(loadingModal("startVoting"));
    const response = await API.startVoting(id, data);
    dispatch(setModalResult("startVoting", response.message));
    dispatch({ type: START_VOTING });
  } catch (error) {
    dispatch(setModalError("startVoting", error.message));
  } finally {
    dispatch(loadedModal("startVoting"));
  }
};

export const archiveVoting = (id) => async (dispatch) => {
  try {
    const response = await API.archiveVoting(id);
    dispatch(showMessage("success", response.message));
    dispatch({ type: ARCHIVE_VOTING, payload: response.result });
  } catch (error) {
    dispatch(showMessage("error", error.message));
  }
};

export const deleteVoting = (id) => async (dispatch) => {
  try {
    await API.deleteVoting(id);
    dispatch({ type: DELETE_VOTING, payload: id });
    dispatch(showMessage("success", "Voting successfully deleted"));
  } catch (error) {
    dispatch(showError(error.message));
  }
};
