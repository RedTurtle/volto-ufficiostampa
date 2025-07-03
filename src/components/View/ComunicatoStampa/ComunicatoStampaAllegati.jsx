import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import {
  Attachment,
  RichTextSection,
} from 'design-comuni-plone-theme/components/ItaliaTheme/View';

const messages = defineMessages({
  attachments: {
    id: 'comunicato_attachments',
    defaultMessage: 'Allegati',
  },
});

const ComunicatoStampaAllegati = ({ content }) => {
  const intl = useIntl();
  const attachments = content.items.filter((i) => i.id !== 'multimedia');
  const SECTION_ID = 'allegati';

  return attachments.length > 0 ? (
    <RichTextSection
      tag_id={SECTION_ID}
      className="it-page-section mb-5"
      title={intl.formatMessage(messages.attachments)}
    >
      <div className="card-wrapper card-teaser-wrapper card-teaser-wrapper-equal">
        {attachments.map((item, _i) => {
          let itemURL = '#';

          switch (item['@type']) {
            case 'File':
              itemURL = `${item['@id']}/@@download/file`;
              break;

            case 'Link':
              itemURL =
                item.remoteUrl?.length > 0 ? item.remoteUrl : item['@id'];
              break;

            default:
              itemURL = item['@id'];
          }

          //questo serve per poter avere in questo caso le info sulla dimensione e formato del file
          let _item = { ...item };
          if (item['@type'] === 'File') {
            _item.file = { ...item };
          }
          if (item['@type'] === 'Image') {
            _item.image = { ...item };
          }

          return (
            <Attachment
              key={item['@id']}
              title={item.title}
              description={item.description}
              download_url={itemURL}
              item={_item}
            />
          );
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
