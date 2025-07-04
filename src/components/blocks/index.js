import loadable from '@loadable/component';

export const SearchComunicatiPrePloneEdit = loadable(
  () =>
    import(
      /* webpackChunkName: "volto-ufficiostampa_edit" */ 'volto-ufficiostampa/components/blocks/SearchComunicatiPrePlone/Edit'
    ),
);

export const SearchComunicatiPrePloneView = loadable(
  () =>
    import(
      /* webpackChunkName: "volto-ufficiostampa_blocks" */ 'volto-ufficiostampa/components/blocks/SearchComunicatiPrePlone/View'
    ),
);
