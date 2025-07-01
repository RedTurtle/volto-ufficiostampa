import loadable from '@loadable/component';

export const LegislatureWidget = loadable(
  () =>
    import(
      /* webpackChunkName: "RERSearchManage" */ 'volto-ufficiostampa/components/manage/widgets/LegislatureWidget/LegislatureWidget'
    ),
);
