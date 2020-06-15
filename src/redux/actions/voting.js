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
  GET_VOTING_EVENTS,
} from "../constants";
import { Voting } from "../../utils/api";
import { showError, showMessage } from "./app";
import {
  loadingModal,
  loadedModal,
  setModalError,
  setModalResult,
} from "./modals";
import moment from "moment";
import { addKey } from "../../utils/uniqueKeys";

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
    const data = await Voting.getOne(id);
    dispatch({ type: GET_VOTING_FROM_DB, payload: data.body.result });
    const result = await Voting.getResult(id);
    dispatch({ type: GET_VOTING_FROM_CONTRACT, payload: result.body.result });
    const events = await Voting.getEvents(id);
    dispatch({ type: GET_VOTING_EVENTS, payload: events.body.result });
  } catch (error) {
    console.log(error);
    throw new Error(error);
    // dispatch(showError(error.message));
  } finally {
    dispatch(votingLoaded());
  }
};

export const voteForCandidate = (id, data) => async (dispatch) => {
  try {
    dispatch(loadingModal("vote"));
    const { body } = await Voting.vote(id, data);
    dispatch(
      setModalResult(
        "vote",
        `Successfully votes. You can check your transaction by link:
        https://kovan.etherscan.io/tx/${body.result.tx}`
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
    const { body } = await Voting.create({
      ...data,
      endTime: moment(data.endTime).valueOf(),
    });
    dispatch(
      setModalResult(
        "createVoting",
        `${body.message}. Your admin token ${body.adminToken}`
      )
    );
    dispatch({ type: CREATE_VOTING, payload: addKey(body.result) });
  } catch (error) {
    dispatch(setModalError("createVoting", error.message));
  } finally {
    dispatch(loadedModal("createVoting"));
    dispatch(votingLoaded());
  }
};

export const addUsersToVoting = (id, formData) => async (dispatch) => {
  try {
    const { body } = await Voting.addUsers(id, formData);
    dispatch(showMessage("success", body.message));
  } catch (error) {
    dispatch(showMessage("error", error.message));
  }
};

export const changeVotingData = (id, data) => async (dispatch) => {
  try {
    const { body } = await Voting.update(id, data);
    dispatch({ type: UPDATE_VOTING, payload: body.result });
    dispatch(showMessage("success", body.message));
  } catch (error) {
    dispatch(showMessage("error", error.message));
  } finally {
  }
};

export const startVoting = (id, data) => async (dispatch) => {
  try {
    dispatch(loadingModal("startVoting"));
    const { body } = await Voting.start(id, data);
    dispatch(setModalResult("startVoting", body.message));
    dispatch({ type: START_VOTING });
  } catch (error) {
    dispatch(setModalError("startVoting", error.message));
  } finally {
    dispatch(loadedModal("startVoting"));
  }
};

export const archiveVoting = (id) => async (dispatch) => {
  try {
    const { body } = await Voting.archive(id);
    dispatch(showMessage("success", body.message));
    dispatch({
      type: ARCHIVE_VOTING,
      payload: { ...body.result, isArchived: true },
    });
  } catch (error) {
    dispatch(showMessage("error", error.message));
  }
};

export const deleteVoting = (id) => async (dispatch) => {
  try {
    await Voting.delete(id);
    dispatch({ type: DELETE_VOTING, payload: id });
    dispatch(showMessage("success", "Voting successfully deleted"));
  } catch (error) {
    dispatch(showError(error.message));
  }
};
