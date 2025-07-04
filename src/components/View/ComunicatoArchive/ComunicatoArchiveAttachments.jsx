import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Card, CardBody, CardTitle } from 'design-react-kit';
import { RichTextSection } from 'design-comuni-plone-theme/components/ItaliaTheme/View';
import { UniversalLink } from '@plone/volto/components';

const messages = defineMessages({
  allegati: {
    id: 'comunicato_archive_allegati',
    defaultMessage: 'Allegati',
  },
});

const ComunicatoArchiveAttachments = ({ content }) => {
  const intl = useIntl();
  return content?.allegati?.length > 0 ? (
    <RichTextSection
      title={intl.formatMessage(messages.allegati)}
      tag_id="allegati"
    >
      <div className="card-wrapper card-teaser-wrapper card-teaser-wrapper-equal">
        {content.allegati.map((a, index) => (
          <Card
            className="card card-teaser shadow p-4 mt-3 rounded"
            noWrapper={true}
            key={index}
          >
            <CardBody>
              <CardTitle>
                <UniversalLink href={a.url}>{a.nome}</UniversalLink>
              </CardTitle>
            </CardBody>
          </Card>
        ))}
      </div>
    </RichTextSection>
  ) : null;
};

export default ComunicatoArchiveAttachments;
