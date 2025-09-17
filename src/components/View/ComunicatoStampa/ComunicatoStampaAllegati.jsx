import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import { RichTextSection } from 'design-comuni-plone-theme/components/ItaliaTheme/View';

import UfficioStampaAttachment from 'volto-ufficiostampa/components/manage/UfficioStampaAttachment/UfficioStampaAttachment';

const messages = defineMessages({
  attachments: {
    id: 'comunicato_attachments',
    defaultMessage: 'Allegati',
  },
});

const ComunicatoStampaAllegati = ({ content }) => {
  const intl = useIntl();
  const attachments = content.items.filter((i) => {
    if (i['@type'] === 'CartellaStampa') {
      if (i.id === 'multimedia') {
        return false;
      }
      return i.has_children;
    }
    return true;
  });
  const SECTION_ID = 'allegati';

  return attachments.length > 0 ? (
    <RichTextSection
      tag_id={SECTION_ID}
      className="it-page-section mb-5"
      title={intl.formatMessage(messages.attachments)}
    >
      <div className="card-wrapper card-teaser-wrapper card-teaser-wrapper-equal">
        {attachments.map((item, _i) => {
          return <UfficioStampaAttachment key={item['@id']} item={item} />;
        })}
      </div>
    </RichTextSection>
  ) : (
    <></>
  );
};

ComunicatoStampaAllegati.propTypes = {
  content: PropTypes.object.isRequired,
};

export default ComunicatoStampaAllegati;
