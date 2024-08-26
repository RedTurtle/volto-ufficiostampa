import {
  ManageChannelsControlpanel,
  ManageHistoryControlpanel,
  SendComunicatoView,
  SendMenu,
} from './components';

import {
  sendComunicatoSchemaReducer,
  sendComunicatoReducer,
  getSubscriptionsReducer,
  importSubscriptionsReducer,
  addSubscriptionReducer,
  deleteSubscriptionsReducer,
  getSendHistoryReducer,
  deleteSendHistoryReducer,
} from './reducers';

const applyConfig = (config) => {
  config.settings.appExtras = [
    ...config.settings.appExtras,
    {
      match: '',
      component: SendMenu,
    },
  ];
  config.settings.contextualVocabularies = [
    ...config.settings.contextualVocabularies || [],
    'rer.ufficiostampa.vocabularies.attachments',
  ];
  config.addonRoutes = [
    ...config.addonRoutes,
    {
      path: '/**/@send-comunicato',
      component: SendComunicatoView,
    },
    {
      path: '/controlpanel/ufficiostampa-managechannels',
      component: ManageChannelsControlpanel,
    },
    {
      path: '/controlpanel/ufficiostampa-managehistory',
      component: ManageHistoryControlpanel,
    },
  ];
  config.settings.nonContentRoutes = [
    ...config.settings.nonContentRoutes,
    '/@send-comunicato',
  ];
  config.addonReducers = {
    ...config.addonReducers,
    comunicatoSchemaReducer: sendComunicatoSchemaReducer,
    comunicatoSendReducer: sendComunicatoReducer,
    // manageChannels
    getSubscriptions: getSubscriptionsReducer,
    deleteSubscriptions: deleteSubscriptionsReducer,
    addSubscription: addSubscriptionReducer,
    // exportSubscriptios: exportSubscriptionsReducer,
    importSubscriptions: importSubscriptionsReducer,
    // manageHistory
    getSendHistory: getSendHistoryReducer,
    deleteSendHistory: deleteSendHistoryReducer,
  };
  return config;
};

export default applyConfig;
