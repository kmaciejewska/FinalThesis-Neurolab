import { GET_ERRORS, RESET_ALERT } from "../actions/types";

const initialState = {
  msg: "",
  status: null,
};

const errorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        msg: action.payload.msg,
        status: action.payload.status,
      };
    case RESET_ALERT:
      return initialState;
    default:
      return state;
  }
};

export default errorsReducer;
