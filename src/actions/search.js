import config from '@plone/volto/registry';

export const SEARCH_COMUNICATI_OLD = 'SEARCH_COMUNICATI_OLD';
export const RESET_SEARCH_COMUNICATI_OLD = 'RESET_SEARCH_COMUNICATI_OLD';

export const SEARCH_COMUNICATI_PARAMETERS = 'SEARCH_COMUNICATI_PARAMETERS';

export const SEARCH_COMUNICATI = 'SEARCH_COMUNICATI';
export const RESET_SEARCH_COMUNICATI = 'RESET_SEARCH_COMUNICATI';

export function searchComunicatiOld(data, subrequest, page = 1) {
  const b_size = data.b_size ?? config.settings.defaultPageSize;
  const b_start = b_size * (page - 1);
  let _query = data.query.map((q) => {
    return `${q.i}=${q.v}`;
  });

  const query = _query.join('&');
  return {
    type: SEARCH_COMUNICATI_OLD,
    subrequest,
    request: {
      op: 'get',
      path: `/@search-comunicati-archive?b_size=${b_size}&b_start=${b_start}&${query}`,
    },
  };
}

export function resetSearchComunicatiOld(subrequest = null) {
  return {
    type: SEARCH_COMUNICATI_OLD,
    subrequest,
  };
}

export function searchComunicatiParameters() {
  return {
    type: SEARCH_COMUNICATI_PARAMETERS,
    request: {
      op: 'get',
      path: `/@search_comunicati_parameters`,
    },
  };
}

export function searchComunicati(data, subrequest, page = 1) {
  const b_size = data.b_size ?? config.settings.defaultPageSize;
  const b_start = b_size * (page - 1);
  let _query = data.query.map((q) => {
    return `${q.i}=${q.v}`;
  });

  const query = _query.join('&');
  return {
    type: SEARCH_COMUNICATI,
    subrequest,
    request: {
      op: 'get',
      path: `/@search-comunicati?b_size=${b_size}&b_start=${b_start}&${query}&sort_on="effective"&sort_order="reverse"`,
    },
  };
}

export function resetSearchComunicati(subrequest = null) {
  return {
    type: SEARCH_COMUNICATI,
    subrequest,
  };
}
