import { RESET_ALERT } from "./types";

export const resetAlert = () => (dispatch) => {
  dispatch({
    type: RESET_ALERT,
    payload: {},
  });
};
