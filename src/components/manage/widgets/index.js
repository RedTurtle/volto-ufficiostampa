import loadable from '@loadable/component';

export const LegislatureWidget = loadable(
  () =>
    import(
      /* webpackChunkName: "volto-ufficiostampa" */ 'volto-ufficiostampa/components/manage/widgets/LegislatureWidget/LegislatureWidget'
    ),
);
