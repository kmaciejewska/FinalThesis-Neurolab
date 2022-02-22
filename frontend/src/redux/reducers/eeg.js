import {
  ADD_FILE,
  GET_FILTER_SETTINGS,
  GET_FORMATS,
  PREPROCESS,
  PREDICT,
  RESET,
} from "../actions/types.js";

const initialState = {
  formats: [],
  file: null,
  fileInfo: {},
  initialPlot: {},
  filterSettings: {},
  defaultSettings: {},
  origPlot: {}, //may be resampled
  filteredPlot: {},
  predictionProbability: 0,
  numberOfAllChannels: 0,
  epiChannels: [],
};

const eegReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FORMATS:
      return {
        ...state,
        formats: action.payload,
      };
    case GET_FILTER_SETTINGS:
      return {
        ...state,
        filterSettings: action.payload.filterSettings,
        defaultSettings: action.payload.defaultSettings,
      };
    case ADD_FILE:
      return {
        ...state,
        file: action.payload.file,
        fileInfo: action.payload.fileInfo,
        plot: action.payload.plot,
      };
    case PREPROCESS: //reset classifier
      return {
        ...state,
        filteredPlot: action.payload,
        predictionProbability: 0,
        epiChannels: [],
        numberOfAllChannels: 0,
      };
    case PREDICT:
      return {
        ...state,
        predictionProbability: action.payload.predictionProbability,
        epiChannels: action.payload.epiChannels,
        numberOfAllChannels: action.payload.numberOfAllChannels,
      };
    case RESET:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default eegReducer;
