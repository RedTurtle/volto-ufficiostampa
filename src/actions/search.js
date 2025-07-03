import config from '@plone/volto/registry';

export const SEARCH_COMUNICATI_OLD = 'SEARCH_COMUNICATI_OLD';
export const RESET_SEARCH_COMUNICATI_OLD = 'RESET_SEARCH_COMUNICATI_OLD';

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
