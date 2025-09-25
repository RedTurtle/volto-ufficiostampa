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
import {
  sendChannelManagementLinkReducer,
  updatePersonalChannelsReducer,
  tokenVerifyPersonalChannelsReducer,
} from './personal_channels_management';

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
  sendChannelManagementLinkReducer,
  updatePersonalChannelsReducer,
  tokenVerifyPersonalChannelsReducer,
};
