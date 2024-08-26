export const GET_SENDCOMUNICATO_SCHEMA = 'GET_SENDCOMUNICATO_SCHEMA';

export function getSendComunicatoSchema(url) {
  return {
    type: GET_SENDCOMUNICATO_SCHEMA,
    request: {
      op: 'get',
      path: `${url}/@send-comunicato-schema`,
    },
  };
}

export const GET_SENDCOMUNICATO = 'GET_SENDCOMUNICATO';

export function sendComunicato(url, data) {
  return {
    type: GET_SENDCOMUNICATO,
    request: {
      op: 'post',
      path: `${url}/@send-comunicato`,
      data: data,
    },
  };
}

export function resetSendComunicato() {
  return {
    type: `${GET_SENDCOMUNICATO}_RESET`,
  };
}

export const GET_SUBSCRIPTIONS = 'GET_SUBSCRIPTIONS';
export const DELETE_SUBSCRIPTIONS = 'DELETE_SUBSCRIPTIONS';
export const RESET_DELETE_SUBSCRIPTIONS = 'RESET_DELETE_SUBSCRIPTIONS';

export function resetDeleteSubscriptions() {
  return { type: RESET_DELETE_SUBSCRIPTIONS };
}

export function getSubscriptions(data) {
  return {
    type: GET_SUBSCRIPTIONS,
    request: {
      op: 'get',
      path: '/@subscriptions',
      params: data,
    },
  };
}

export function deleteSubscriptions(data) {
  return {
    type: DELETE_SUBSCRIPTIONS,
    request: {
      op: 'del',
      path: '/@subscriptions',
      data,
    },
  };
}

export const NEWSLETTER_IMPORT_SUBSCRIPTIONS =
  'NEWSLETTER_IMPORT_SUBSCRIPTIONS';

export function importSubscriptions(data) {
  return {
    type: NEWSLETTER_IMPORT_SUBSCRIPTIONS,
    request: {
      op: 'post',
      path: `/@subscriptions-csv`,
      data,
    },
  };
}

export function resetImportSubscription() {
  return { type: `${NEWSLETTER_IMPORT_SUBSCRIPTIONS}_RESET` };
}

export const NEWSLETTER_ADD_SUBSCRIPTION = 'NEWSLETTER_ADD_SUBSCRIPTION';

export function addSubscription(data) {
  return {
    type: NEWSLETTER_ADD_SUBSCRIPTION,
    request: {
      op: 'post',
      path: `/@subscriptions`,
      data,
    },
  };
}

export function resetAddSubscription() {
  return { type: `${NEWSLETTER_ADD_SUBSCRIPTION}_RESET` };
}


export const DELETE_SEND_HISTORY = 'DELETE_SEND_HISTORY';
export const GET_SEND_HISTORY = 'GET_SEND_HISTORY';
export const RESET_DELETE_SEND_HISTORY = 'RESET_DELETE_SEND_HISTORY';

export function resetDeleteSendHistory() {
  return { type: RESET_DELETE_SEND_HISTORY };
}

export function getSendHistory(data) {
  return {
    type: GET_SEND_HISTORY,
    request: {
      op: 'get',
      path: '/@send-history',
      params: data,
    },
  };
}

export function deleteSendHistory(data) {
  return {
    type: DELETE_SEND_HISTORY,
    request: {
      op: 'del',
      path: '/@send-history',
      params: data,
    },
  };
}
