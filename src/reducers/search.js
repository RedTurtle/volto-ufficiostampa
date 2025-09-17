import { omit } from 'lodash';
import {
  SEARCH_COMUNICATI_OLD,
  RESET_SEARCH_COMUNICATI_OLD,
  SEARCH_COMUNICATI_PARAMETERS,
  SEARCH_COMUNICATI,
  RESET_SEARCH_COMUNICATI,
} from 'volto-ufficiostampa/actions/search';

const initialState = {
  error: null,
  items: [],
  total: 0,
  loaded: false,
  loading: false,
  batching: {},
  subrequests: {},
};

export function searchComunicatiOldReducer(state = initialState, action = {}) {
  switch (action.type) {
    case `${SEARCH_COMUNICATI_OLD}_PENDING`:
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                ...(state.subrequests[action.subrequest] || {
                  items: [],
                  total: 0,
                  batching: {},
                }),
                error: null,
                loaded: false,
                loading: true,
              },
            },
          }
        : {
            ...state,
            error: null,
            loading: true,
            loaded: false,
          };
    case `${SEARCH_COMUNICATI_OLD}_SUCCESS`:
      const _result = action.result;
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                error: null,
                items: _result.items,
                total: _result.items_total,
                loaded: true,
                loading: false,
                batching: { ..._result.batching },
              },
            },
          }
        : {
            ...state,
            error: null,
            items: _result.items,
            total: _result.items_total,
            loaded: true,
            loading: false,
            batching: { ..._result.batching },
          };
    case `${SEARCH_COMUNICATI_OLD}_FAIL`:
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                error: action.error,
                items: [],
                total: 0,
                loading: false,
                loaded: false,
                batching: {},
              },
            },
          }
        : {
            ...state,
            error: action.error,
            items: [],
            total: 0,
            loading: false,
            loaded: false,
            batching: {},
          };
    case RESET_SEARCH_COMUNICATI_OLD:
      return action.subrequest
        ? {
            ...state,
            subrequests: omit(state.subrequests, [action.subrequest]),
          }
        : {
            ...state,
            error: null,
            items: [],
            total: 0,
            loading: false,
            loaded: false,
            batching: {},
          };

    default:
      return state;
  }
}

export function searchComunicatiParametersReducer(
  state = initialState,
  action = {},
) {
  switch (action.type) {
    case `${SEARCH_COMUNICATI_PARAMETERS}_PENDING`:
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                ...(state.subrequests[action.subrequest] || {
                  items: [],
                  total: 0,
                  batching: {},
                }),
                error: null,
                loaded: false,
                loading: true,
              },
            },
          }
        : {
            ...state,
            error: null,
            loading: true,
            loaded: false,
          };
    case `${SEARCH_COMUNICATI_PARAMETERS}_SUCCESS`:
      const _result = action.result;

      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                error: null,
                items: _result,
                loaded: true,
                loading: false,
              },
            },
          }
        : {
            ...state,
            error: null,
            items: _result,
            loaded: true,
            loading: false,
          };
    case `${SEARCH_COMUNICATI_PARAMETERS}_FAIL`:
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                error: action.error,
                items: [],
                total: 0,
                loading: false,
                loaded: false,
                batching: {},
              },
            },
          }
        : {
            ...state,
            error: action.error,
            items: [],
            total: 0,
            loading: false,
            loaded: false,
            batching: {},
          };

    default:
      return state;
  }
}

export function searchComunicatiReducer(state = initialState, action = {}) {
  switch (action.type) {
    case `${SEARCH_COMUNICATI}_PENDING`:
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                ...(state.subrequests[action.subrequest] || {
                  items: [],
                  total: 0,
                  batching: {},
                }),
                error: null,
                loaded: false,
                loading: true,
              },
            },
          }
        : {
            ...state,
            error: null,
            loading: true,
            loaded: false,
          };
    case `${SEARCH_COMUNICATI}_SUCCESS`:
      const _result = action.result;
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                error: null,
                items: _result.items,
                total: _result.items_total,
                loaded: true,
                loading: false,
                batching: { ..._result.batching },
              },
            },
          }
        : {
            ...state,
            error: null,
            items: _result.items,
            total: _result.items_total,
            loaded: true,
            loading: false,
            batching: { ..._result.batching },
          };
    case `${SEARCH_COMUNICATI}_FAIL`:
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                error: action.error,
                items: [],
                total: 0,
                loading: false,
                loaded: false,
                batching: {},
              },
            },
          }
        : {
            ...state,
            error: action.error,
            items: [],
            total: 0,
            loading: false,
            loaded: false,
            batching: {},
          };
    case RESET_SEARCH_COMUNICATI:
      return action.subrequest
        ? {
            ...state,
            subrequests: omit(state.subrequests, [action.subrequest]),
          }
        : {
            ...state,
            error: null,
            items: [],
            total: 0,
            loading: false,
            loaded: false,
            batching: {},
          };

    default:
      return state;
  }
}
