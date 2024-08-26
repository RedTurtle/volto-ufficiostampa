import {
    GET_SEND_HISTORY,
    DELETE_SEND_HISTORY,
    RESET_DELETE_SEND_HISTORY,
} from '../actions';

const initialState = {
    error: null,
    loaded: false,
    loading: false,
    result: null,
    subrequests: {},
  };
  
export const getSendHistoryReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case `${GET_SEND_HISTORY}_PENDING`:
            return {
                ...state,
                error: null,
                loaded: false,
                loading: true,
                result: null,
            };
        case `${GET_SEND_HISTORY}_SUCCESS`:
            return {
                ...state,
                error: null,
                loaded: true,
                result: action.result,
                loading: false,
            };
        case `${GET_SEND_HISTORY}_FAIL`:
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
} 

export const deleteSendHistoryReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case `${DELETE_SEND_HISTORY}_PENDING`:
            return {
                ...state,
                error: null,
                loaded: false,
                loading: true,
                result: null,
            };
        case `${DELETE_SEND_HISTORY}_SUCCESS`:
            return {
                ...state,
                error: null,
                loaded: true,
                result: action.result,
                loading: false,
            };
        case `${DELETE_SEND_HISTORY}_FAIL`:
            return {
                ...state,
                error: action.error,
                result: null,
                loaded: true,
                loading: false,
            };
        case RESET_DELETE_SEND_HISTORY:
            return initialState;
        default:
            return state;
    }
}