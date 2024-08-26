import loadable from '@loadable/component';

export const SendMenu = loadable(() =>
  import(/* webpackChunkName: "UfficioStampaManage" */ './Menu/Menu'),
);
export const SendComunicatoView = loadable(() =>
  import(
    /* webpackChunkName: "UfficioStampaManage" */ './manage/SendComunicatoView/SendComunicatoView'
  ),
);
export const ManageChannelsControlpanel = loadable(() =>
  import(
    /* webpackChunkName: "UfficioStampaManage" */ './manage/SubscriptionsPanel/SubscriptionsPanel'
  ),
);
export const ManageHistoryControlpanel = loadable(() =>
  import(
    /* webpackChunkName: "UfficioStampaManage" */ './manage/SendHistoryPanel/SendHistoryPanel'
  ),
);
