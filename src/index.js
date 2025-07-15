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
  updateSubscriptionReducer,
  deleteSubscriptionsReducer,
  getSendHistoryReducer,
  deleteSendHistoryReducer,
  searchComunicatiOldReducer,
  getComunicatoArchiveReducer,
} from './reducers';

import { LegislatureWidget } from 'volto-ufficiostampa/components/manage/widgets';
import RegistryImageWidget from '@plone/volto/components/manage/Widgets/RegistryImageWidget';
import {
  CartellaStampaView,
  ComunicatoStampaView,
  ComunicatoArchive,
} from 'volto-ufficiostampa/components/View';

import {
  SearchComunicatiPrePloneView,
  SearchComunicatiPrePloneEdit,
} from 'volto-ufficiostampa/components/blocks';

import zoomOffSVG from '@plone/volto/icons/zoom-off.svg';

const isSearchOldEnabled = () => {
  let test =
    process.env.RAZZLE_SEARCH_COMUNICATI_OLD ||
    (__CLIENT__ && window?.env.RAZZLE_SEARCH_COMUNICATI_OLD);

  test = test == true || test === 'true';
  return test;
};

const applyConfig = (config) => {
  config.settings.appExtras = [
    ...config.settings.appExtras,
    {
      match: '',
      component: SendMenu,
    },
  ];
  config.settings.contextualVocabularies = [
    ...(config.settings.contextualVocabularies || []),
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
    {
      path: '*/dettaglio-comunicato-archive/:id',
      component: ComunicatoArchive,
    },
  ];
  config.settings.nonContentRoutes = [
    ...config.settings.nonContentRoutes,
    '/@send-comunicato',
    '/dettaglio-comunicato-archive/',
  ];
  config.addonReducers = {
    ...config.addonReducers,
    comunicatoSchemaReducer: sendComunicatoSchemaReducer,
    comunicatoSendReducer: sendComunicatoReducer,
    // manageChannels
    getSubscriptions: getSubscriptionsReducer,
    deleteSubscriptions: deleteSubscriptionsReducer,
    addSubscription: addSubscriptionReducer,
    updateSubscription: updateSubscriptionReducer,
    // exportSubscriptios: exportSubscriptionsReducer,
    importSubscriptions: importSubscriptionsReducer,
    // manageHistory
    getSendHistory: getSendHistoryReducer,
    deleteSendHistory: deleteSendHistoryReducer,
    searchComunicatiOld: searchComunicatiOldReducer,
    comunicatoArchive: getComunicatoArchiveReducer,
  };

  config.widgets.id = {
    ...config.widgets.id,
    legislatures: LegislatureWidget,
    mail_logo: RegistryImageWidget,
  };

  config.views.contentTypesViews = {
    ...config.views.contentTypesViews,
    CartellaStampa: CartellaStampaView,
    ComunicatoStampa: ComunicatoStampaView,
    InvitoStampa: ComunicatoStampaView,
  };

  config.blocks.groupBlocksOrder = config.blocks.groupBlocksOrder.concat([
    { id: 'comunicati', title: 'Comunicati' },
  ]);

  config.blocks.blocksConfig.searchComunicatiOld = {
    id: 'searchComunicatiOld',
    title: 'Ricerca comunicati pre-Plone',
    icon: zoomOffSVG,
    group: 'comunicati',
    view: SearchComunicatiPrePloneView,
    edit: SearchComunicatiPrePloneEdit,
    restricted: !isSearchOldEnabled, //questo blocco è aggiungibile solo se c'è la variabile d'ambiente RAZZLE_SEARCH_COMUNICATI_OLD
    mostUsed: false,
    security: {
      addPermission: [],
      view: [],
    },
    sidebarTab: 0,
  };

  return config;
};

export default applyConfig;
