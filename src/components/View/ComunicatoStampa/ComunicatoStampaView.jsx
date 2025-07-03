/**
 * ComunicatoStampaView view component.
 * @module components/View/ComunicatoStampa/ComunicatoStampaView
 */

import React, { createRef } from 'react';
import PropTypes from 'prop-types';

import {
  PageHeader,
  ContentImage,
  SkipToMainContent,
  useSideMenu,
  useReadingTime,
  ContentTypeViewSections,
} from 'design-comuni-plone-theme/components/ItaliaTheme/View';

import ComunicatoStampaText from 'volto-ufficiostampa/components/View/ComunicatoStampa/ComunicatoStampaText';
import ComunicatoStampaGallery from 'volto-ufficiostampa/components/View/ComunicatoStampa/ComunicatoStampaGallery';
import ComunicatoStampaAllegati from 'volto-ufficiostampa/components/View/ComunicatoStampa/ComunicatoStampaAllegati';
import ComunicatoStampaMetadata from 'volto-ufficiostampa/components/View/ComunicatoStampa/ComunicatoStampaMetadata';
import ComunicatoStampaPlaceholderAfterContent from 'volto-ufficiostampa/components/View/ComunicatoStampa/Placeholder/AfterContent';

import { defineMessages, useIntl } from 'react-intl';

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

export const ComunicatoStampaViewSectionsOrder = [
  {
    /* HEADER IMAGE */
    component: ContentImage,
    props: { position: 'documentBody' },
  },
  { /* TEXT BODY */ component: ComunicatoStampaText },
  { /* GALLERY */ component: ComunicatoStampaGallery },
  { /* ALLEGATI */ component: ComunicatoStampaAllegati },
  { /* ULTERIORI INFORMAZIONI */ component: ComunicatoStampaMetadata },
];

/**
 * ComunicatoStampaView view component class.
 * @function ComunicatoStampaView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const ComunicatoStampaView = ({ content, location }) => {
  let documentBody = createRef();
  const intl = useIntl();
  const { sideMenuElements, SideMenu } = useSideMenu(content, documentBody);
  const { readingtime } = useReadingTime(content, documentBody);

  return (
    <>
      <div className="container px-4 my-4 newsitem-view">
        <SkipToMainContent />
        <PageHeader
          content={content}
          readingtime={readingtime}
          showreadingtime={true}
          showdates={true}
          showtassonomiaargomenti={true}
        />

        {/* HEADER IMAGE */}
        <ContentImage content={content} position="afterHeader" />
        <div className="row row-column-border border-light row-column-menu-left">
          <aside
            className="col-lg-4"
            aria-label={intl.formatMessage(messages.sideMenuIndex)}
          >
            <SideMenu data={sideMenuElements} content_uid={content?.UID} />
          </aside>

          <section
            className="col-lg-8 it-page-sections-container border-light"
            id="main-content-section"
            ref={documentBody}
            aria-label={intl.formatMessage(messages.itemContent)}
          >
            {/* SEZIONI */}
            <ContentTypeViewSections
              content={content}
              defaultSections={ComunicatoStampaViewSectionsOrder}
            />
          </section>
        </div>
      </div>
      <ComunicatoStampaPlaceholderAfterContent content={content} />
    </>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
ComunicatoStampaView.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    effective: PropTypes.string,
    expires: PropTypes.string,
    image: PropTypes.object,
    image_caption: PropTypes.string,
    text: PropTypes.shape({
      data: PropTypes.string,
    }),
    items: PropTypes.array,
    modified: PropTypes.string,
    rights: PropTypes.string,
  }).isRequired,
};

export default ComunicatoStampaView;
