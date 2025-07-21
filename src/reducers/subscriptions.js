import {
  DELETE_SUBSCRIPTIONS,
  GET_SUBSCRIPTIONS,
  UFFICIOSTAMPA_IMPORT_SUBSCRIPTIONS,
  UFFICIOSTAMPA_ADD_SUBSCRIPTION,
  UFFICIOSTAMPA_UPDATE_SUBSCRIPTION,
} from '../actions';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  result: null,
  subrequests: {},
};

export const getSubscriptionsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case `${GET_SUBSCRIPTIONS}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
        result: null,
      };
    case `${GET_SUBSCRIPTIONS}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        result: action.result,
        loading: false,
      };
    case `${GET_SUBSCRIPTIONS}_FAIL`:
      return {
        ...state,
        error: action.error,
        result: null,
        loaded: true,
        loading: false,
      };
    default:
      return state;
  }
};

export const deleteSubscriptionsReducer = (
  state = initialState,
  action = {},
) => {
  switch (action.type) {
    case `${DELETE_SUBSCRIPTIONS}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
        result: null,
      };
    case `${DELETE_SUBSCRIPTIONS}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        result: action.result,
        loading: false,
      };
    case `${DELETE_SUBSCRIPTIONS}_FAIL`:
      return {
        ...state,
        error: action.error,
        result: null,
        loaded: true,
        loading: false,
      };
    default:
      return state;
  }
};

export function importSubscriptionsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case `${UFFICIOSTAMPA_IMPORT_SUBSCRIPTIONS}_PENDING`:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case `${UFFICIOSTAMPA_IMPORT_SUBSCRIPTIONS}_SUCCESS`:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        result: action.result,
      };
    case `${UFFICIOSTAMPA_IMPORT_SUBSCRIPTIONS}_FAIL`:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.error,
      };
    case `${UFFICIOSTAMPA_IMPORT_SUBSCRIPTIONS}_RESET`:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

export function addSubscriptionReducer(state = initialState, action = {}) {
  switch (action.type) {
    case `${UFFICIOSTAMPA_ADD_SUBSCRIPTION}_PENDING`:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case `${UFFICIOSTAMPA_ADD_SUBSCRIPTION}_SUCCESS`:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        result: action.result,
      };
    case `${UFFICIOSTAMPA_ADD_SUBSCRIPTION}_FAIL`:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.error,
      };
    case `${UFFICIOSTAMPA_ADD_SUBSCRIPTION}_RESET`:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

export function updateSubscriptionReducer(state = initialState, action = {}) {
  switch (action.type) {
    case `${UFFICIOSTAMPA_UPDATE_SUBSCRIPTION}_PENDING`:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case `${UFFICIOSTAMPA_UPDATE_SUBSCRIPTION}_SUCCESS`:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        result: action.result,
      };
    case `${UFFICIOSTAMPA_UPDATE_SUBSCRIPTION}_FAIL`:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.error,
      };
    case `${UFFICIOSTAMPA_UPDATE_SUBSCRIPTION}_RESET`:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
