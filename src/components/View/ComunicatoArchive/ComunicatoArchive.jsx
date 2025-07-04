/* eslint-disable react-hooks/rules-of-hooks */
/**
 * ComunicatoArchive view component.
 * @module components/View/ComunicatoArchive/ComunicatoArchive
 */

import React, { useEffect, createRef } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Helmet from '@plone/volto/helpers/Helmet/Helmet';
import { resetContent } from '@plone/volto/actions/content/content';
import { getComunicatoArchive } from 'volto-ufficiostampa/actions/comunicatoArchive';
import ComunicatoArchiveText from 'volto-ufficiostampa/components/View/ComunicatoArchive/ComunicatoArchiveText';
import ComunicatoArchiveAttachments from 'volto-ufficiostampa/components/View/ComunicatoArchive/ComunicatoArchiveAttachments';

import {
  PageHeader,
  SkipToMainContent,
  useSideMenu,
  ContentTypeViewSections,
} from 'design-comuni-plone-theme/components/ItaliaTheme/View';

const messages = defineMessages({
  sideMenuIndex: {
    id: 'sideMenuIndex',
    defaultMessage: 'Indice della pagina',
  },
  itemContent: {
    id: 'comunicatoContent',
    defaultMessage: 'Contenuto del comunicato',
  },
});

export const ComunicatoArchiveViewSectionsOrder = [
  { /* TEXT BODY */ component: ComunicatoArchiveText },
  { /* ALLEGATI */ component: ComunicatoArchiveAttachments },
];

/**
 * ComunicatoArchive view component class.
 * @function ComunicatoArchive
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const ComunicatoArchive = ({ match, route, location }) => {
  const intl = useIntl();
  let documentBody = createRef();
  const dispatch = useDispatch();
  const id = match?.params?.id ?? '';

  if (id?.length === 0) {
    return <Redirect to="/" />;
  }
  //search

  const comunicatoArchiveSearch = useSelector(
    (state) => state.comunicatoArchive,
  );
  const result = useSelector((state) => state.comunicatoArchive.result);

  //page title and description
  const title = result?.titolo;
  let description = result?.area;

  if (result?.sommario) {
    description = description
      ? description + '\n' + result?.sommario
      : result?.sommario;
  }
  const date = result?.data_e_ora;

  const content = {
    ...result,
    '@id': location.pathname,
    '@type': 'ComunicatoArchive',
    title,
    description,
    effective: date,
  };

  const { sideMenuElements, SideMenu } = useSideMenu(content, documentBody);
  //carico il contenuto
  useEffect(() => {
    if (!comunicatoArchiveSearch.loading) {
      dispatch(getComunicatoArchive(id));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    dispatch(resetContent());
  }, []);

  return (
    <>
      <Helmet title={title} />
      <div className="public-ui">
        <div className="container px-4 my-4 comunicato-archive-view ciao">
          <SkipToMainContent />
          {result ? (
            <>
              <PageHeader content={content} showdates={true} />

              <div className="row row-column-border border-light row-column-menu-left">
                {/* <aside
                  className="col-lg-4"
                  aria-label={intl.formatMessage(messages.sideMenuIndex)}
                >
                  <SideMenu data={sideMenuElements} content_uid={content?.id} />
                </aside> */}

                <section
                  id="main-content-section"
                  //className="col-lg-8 it-page-sections-container border-light"
                  className="it-page-sections-container mt-5"
                  aria-live="polite"
                  ref={documentBody}
                  aria-label={intl.formatMessage(messages.itemContent)}
                >
                  {/* SEZIONI */}
                  <ContentTypeViewSections
                    content={content}
                    defaultSections={ComunicatoArchiveViewSectionsOrder}
                  />
                </section>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default ComunicatoArchive;
