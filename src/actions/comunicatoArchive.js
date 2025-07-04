export const GET_COMUNICATO_ARCHIVE = 'GET_COMUNICATO_ARCHIVE';

export function getComunicatoArchive(id) {
  return {
    type: GET_COMUNICATO_ARCHIVE,
    request: {
      op: 'get',
      path: `/@dettaglio-comunicato-archive/${id}`,
    },
  };
}
