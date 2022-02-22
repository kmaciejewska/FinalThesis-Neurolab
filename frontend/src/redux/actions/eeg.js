import axios from "axios";
import {
  ADD_FILE,
  GET_ERRORS,
  GET_FILTER_SETTINGS,
  GET_FORMATS,
  PREDICT,
  PREPROCESS,
  RESET,
} from "./types";

// get allowed file formats
//payload with response data from the server
export const getFormats = () => (dispatch) => {
  axios
    .get("/formats")
    .then((res) => {
      dispatch({
        type: GET_FORMATS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// upload file
//payload with response data from the server
export const uploadFile = (file) => (dispatch) => {
  var formData = new FormData();
  formData.append("file", file[0]);
  axios
    .post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: ADD_FILE,
        payload: {
          file: file[0],
          fileInfo: res.data.info,
          plot: res.data.plot,
        },
      });
    })
    .catch((err) => {
      const errors = {
        msg: err.response.data,
        status: err.response.status,
      };

      dispatch({
        type: GET_ERRORS,
        payload: errors,
      });
    });
};

// get filter settings
//payload with response data from the server
export const getFilterSettings = () => (dispatch) => {
  axios
    .get("/filter-settings")
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: GET_FILTER_SETTINGS,
        payload: {
          filterSettings: res.data.allowed_freqs,
          defaultSettings: res.data.default_freqs,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// preprocess with given filter settings
export const preprocess = (filterState) => (dispatch) => {
  console.log(filterState);
  axios
    .post("/preprocess", filterState, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: PREPROCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      const errors = {
        msg: err.response.data,
        status: err.response.status,
      };

      dispatch({
        type: GET_ERRORS,
        payload: errors,
      });
    });
};

// get filter settings
//payload with response data from the server
export const getPrediction = () => (dispatch) => {
  axios
    .get("/predict")
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: PREDICT,
        payload: {
          predictionProbability: res.data.probability,
          epiChannels: res.data.epi_channels,
          numberOfAllChannels: res.data.num_channels,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// reste state
export const resetState = () => (dispatch) => {
  dispatch({
    type: RESET,
    payload: {
      origPlot: {}, //may be resampled
      filteredPlot: {},
      predictionProbability: 0,
      epiChannels: [],
      file: null,
      fileInfo: {},
      initialPlot: {},
      filterSettings: {},
    },
  });
};
