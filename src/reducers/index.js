import {
  sendComunicatoSchemaReducer,
  sendComunicatoReducer,
} from './sendComunicato';
import {
  getSubscriptionsReducer,
  deleteSubscriptionsReducer,
  importSubscriptionsReducer,
  addSubscriptionReducer,
  updateSubscriptionReducer,
} from './subscriptions';

import { getSendHistoryReducer, deleteSendHistoryReducer } from './history';

import {
  searchComunicatiOldReducer,
  searchComunicatiParametersReducer,
  searchComunicatiReducer,
} from './search';
import { getComunicatoArchiveReducer } from './comunicatoArchive';

export {
  sendComunicatoSchemaReducer,
  sendComunicatoReducer,
  getSubscriptionsReducer,
  deleteSubscriptionsReducer,
  importSubscriptionsReducer,
  addSubscriptionReducer,
  updateSubscriptionReducer,
  getSendHistoryReducer,
  deleteSendHistoryReducer,
  searchComunicatiOldReducer,
  getComunicatoArchiveReducer,
  searchComunicatiParametersReducer,
  searchComunicatiReducer,
};
