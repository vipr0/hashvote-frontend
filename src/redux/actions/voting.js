import {
  LOAD_VOTING,
  GET_VOTING_FROM_DB,
  GET_VOTING_FROM_CONTRACT,
  GETTING_VOTING_FAILED,
} from "../constants";
import API from "../../utils/api";

export const getVoting = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOAD_VOTING });
    const db = await API.getVotingDB(id);
    dispatch({ type: GET_VOTING_FROM_DB, payload: db.result });
    const contract = await API.getVotingContract(id);
    dispatch({ type: GET_VOTING_FROM_CONTRACT, payload: contract.result });
  } catch (error) {
    dispatch({ type: GETTING_VOTING_FAILED, payload: error.message });
  }
};
