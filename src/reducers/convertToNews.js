import { CONVERT_TO_NEWS } from '../actions';

const initialState = {
  error: null,
  result: null,
  loading: false,
  loaded: false,
};

export const convertToNewsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case `${CONVERT_TO_NEWS}_PENDING`:
      return { ...state, loading: true, loaded: false, error: null };
    case `${CONVERT_TO_NEWS}_SUCCESS`:
      return {
        ...state,
        loading: false,
        loaded: true,
        result: action.result,
        error: null,
      };
    case `${CONVERT_TO_NEWS}_FAIL`:
      return {
        ...state,
        loading: false,
        loaded: true,
        result: null,
        error: action.error,
      };
    case `${CONVERT_TO_NEWS}_RESET`:
      return initialState;
    default:
      return state;
  }
};
