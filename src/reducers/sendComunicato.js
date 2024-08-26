import { GET_SENDCOMUNICATO_SCHEMA, GET_SENDCOMUNICATO } from '../actions';

const initialState = {
  error: null,
  hasErrror: false,
  result: null,
  loadingResults: false,
};

export const sendComunicatoSchemaReducer = (
  state = initialState,
  action = {},
) => {
  switch (action.type) {
    case `${GET_SENDCOMUNICATO_SCHEMA}_PENDING`:
      return {
        ...state,
        loadingResults: true,
      };
    case `${GET_SENDCOMUNICATO_SCHEMA}_SUCCESS`:
      return {
        ...state,
        result: action.result,
        loadingResults: false,
      };
    case `${GET_SENDCOMUNICATO_SCHEMA}_FAIL`:
      return {
        ...state,
        error: action.error,
        hasError: true,
        loadingResults: false,
      };
    default:
      return state;
  }
};

export const sendComunicatoReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case `${GET_SENDCOMUNICATO}_PENDING`:
      return {
        ...state,
        loadingResults: true,
      };
    case `${GET_SENDCOMUNICATO}_SUCCESS`:
      return {
        ...state,
        result: action.result,
        loadingResults: false,
      };
    case `${GET_SENDCOMUNICATO}_FAIL`:
      return {
        ...state,
        error: action.error,
        hasError: true,
        loadingResults: false,
      };
    case `${GET_SENDCOMUNICATO}_RESET`:
      return initialState;
    default:
      return state;
  }
};
