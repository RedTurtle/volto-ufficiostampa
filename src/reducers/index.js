import {
  sendComunicatoSchemaReducer,
  sendComunicatoReducer,
} from './sendComunicato';
import {
  getSubscriptionsReducer,
  deleteSubscriptionsReducer,
  importSubscriptionsReducer,
  addSubscriptionReducer,
} from './subscriptions';

import { getSendHistoryReducer, deleteSendHistoryReducer } from './history';

import { searchComunicatiOldReducer } from './search';
import { getComunicatoArchiveReducer } from './comunicatoArchive';

export {
  sendComunicatoSchemaReducer,
  sendComunicatoReducer,
  getSubscriptionsReducer,
  deleteSubscriptionsReducer,
  importSubscriptionsReducer,
  addSubscriptionReducer,
  getSendHistoryReducer,
  deleteSendHistoryReducer,
  searchComunicatiOldReducer,
  getComunicatoArchiveReducer,
};
