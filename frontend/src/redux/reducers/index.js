import { combineReducers } from "redux";
import eeg from "./eeg";
import errors from "./errors";

export default combineReducers({ eeg, errors });
