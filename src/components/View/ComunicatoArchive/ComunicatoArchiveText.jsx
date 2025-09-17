import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import { RichTextSection } from 'design-comuni-plone-theme/components/ItaliaTheme/View';

const messages = defineMessages({
  comunicato_item_contenuto: {
    id: 'comunicato_item_contenuto',
    defaultMessage: 'Contenuto',
  },
});

const ComunicatoArchiveText = ({ content }) => {
  const intl = useIntl();
  if (typeof content !== 'object') return null;

  return (Object.hasOwn || Object.hasOwnProperty)(content, 'testo_completo') ? (
    <RichTextSection
      tag_id="text-body"
      title={intl.formatMessage(messages.comunicato_item_contenuto)}
      show_title={false}
    >
      <div dangerouslySetInnerHTML={{ __html: content.testo_completo }} />
    </RichTextSection>
  ) : null;
};

ComunicatoArchiveText.propTypes = {
  content: PropTypes.shape({
    testo_completo: PropTypes.string,
  }).isRequired,
};

export default ComunicatoArchiveText;
