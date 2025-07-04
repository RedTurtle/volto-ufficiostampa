import { GET_COMUNICATO_ARCHIVE } from 'volto-ufficiostampa/actions/comunicatoArchive';

const initialState = {
  error: null,
  result: {},
  loadingResults: false,
  loaded: false,
};

export const getComunicatoArchiveReducer = (
  state = initialState,
  action = {},
) => {
  switch (action.type) {
    case `${GET_COMUNICATO_ARCHIVE}_PENDING`:
      return {
        ...state,
        loading: true,
        loaded: false,
      };

    case `${GET_COMUNICATO_ARCHIVE}_SUCCESS`:
      return {
        ...state,
        result: action.result,
        loading: false,
        loaded: true,
      };

    case `${GET_COMUNICATO_ARCHIVE}_FAIL`:
      return {
        ...state,
        error: action.error,
        loading: false,
        loaded: false,
      };

    default:
      return state;
  }
};
