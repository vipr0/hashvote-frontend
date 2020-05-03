import {
  GET_ALL_VOTINGS,
  LOAD_VOTINGS,
  GETTING_VOTINGS_SUCCESS,
  GETTING_VOTINGS_FAILED,
} from "../constants";
import API from "../../utils/api";

export const getAllVotings = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_VOTINGS });
    const response = await API.getVotings();
    dispatch({ type: GET_ALL_VOTINGS, payload: response.result });
    dispatch({ type: GETTING_VOTINGS_SUCCESS });
  } catch (error) {
    dispatch({ type: GETTING_VOTINGS_FAILED, payload: error.message });
  }
};
