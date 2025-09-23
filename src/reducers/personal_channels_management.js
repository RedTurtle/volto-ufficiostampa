import {
  SEND_CHANNEL_MANAGEMENT_LINK,
  UPDATE_PERSONAL_CHANNELS,
  TOKEN_VERIFY_PERSONAL_CHANNELS,
} from 'volto-ufficiostampa/actions/personal_channels_management';

const initialState = {
  error: null,
  result: {},
  loadingResults: false,
  loaded: false,
};

export const sendChannelManagementLinkReducer = (
  state = initialState,
  action = {},
) => {
  switch (action.type) {
    case `${SEND_CHANNEL_MANAGEMENT_LINK}_PENDING`:
      return {
        ...state,
        loading: true,
        loaded: false,
      };

    case `${SEND_CHANNEL_MANAGEMENT_LINK}_SUCCESS`:
      return {
        ...state,
        result: action.result,
        loading: false,
        loaded: true,
      };

    case `${SEND_CHANNEL_MANAGEMENT_LINK}_FAIL`:
      return {
        ...state,
        error: action.error,
        loading: false,
        loaded: false,
      };
    case `${SEND_CHANNEL_MANAGEMENT_LINK}_RESET`:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export const updatePersonalChannelsReducer = (
  state = initialState,
  action = {},
) => {
  switch (action.type) {
    case `${UPDATE_PERSONAL_CHANNELS}_PENDING`:
      return {
        ...state,
        loading: true,
        loaded: false,
      };

    case `${UPDATE_PERSONAL_CHANNELS}_SUCCESS`:
      return {
        ...state,
        result: action.result,
        loading: false,
        loaded: true,
      };

    case `${UPDATE_PERSONAL_CHANNELS}_FAIL`:
      return {
        ...state,
        error: action.error,
        loading: false,
        loaded: false,
      };
    case `${UPDATE_PERSONAL_CHANNELS}_RESET`:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export const tokenVerifyPersonalChannelsReducer = (
  state = initialState,
  action = {},
) => {
  switch (action.type) {
    case `${TOKEN_VERIFY_PERSONAL_CHANNELS}_PENDING`:
      return {
        ...state,
        loading: true,
        loaded: false,
      };

    case `${TOKEN_VERIFY_PERSONAL_CHANNELS}_SUCCESS`:
      return {
        ...state,
        result: action.result,
        loading: false,
        loaded: true,
      };

    case `${TOKEN_VERIFY_PERSONAL_CHANNELS}_FAIL`:
      return {
        ...state,
        error: action.error,
        loading: false,
        loaded: false,
      };
    case `${TOKEN_VERIFY_PERSONAL_CHANNELS}_RESET`:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
