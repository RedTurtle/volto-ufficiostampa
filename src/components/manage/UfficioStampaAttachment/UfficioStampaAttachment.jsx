import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import { Card, CardBody, CardTitle } from 'design-react-kit';
import { UniversalLink } from '@plone/volto/components';
import Icon from 'design-comuni-plone-theme/components/ItaliaTheme/Icons/Icon';
import { flattenToAppURL } from '@plone/volto/helpers';

import './attachment.scss';

const messages = defineMessages({
  attachment: {
    id: 'attachment',
    defaultMessage: 'Allegato',
  },
});

const UfficioStampaAttachment = ({ item = {} }) => {
  const intl = useIntl();
  const { title, description } = item;
  let itemURL = '#';

  switch (item['@type']) {
    case 'File':
      itemURL = `${item['@id']}/@@download/file`;
      break;
    case 'Image':
      itemURL = `${item['@id']}/@@download/image`;
      break;
    case 'Link':
      itemURL = item.remoteUrl?.length > 0 ? item.remoteUrl : item['@id'];
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

  let iconClass = 'it-clip';
  if (['CartellaStampa'].includes(item['@type'])) {
    iconClass = 'it-folder';
  }

  return (
    <Card
      className="card card-teaser shadow p-4 mt-3 rounded attachment ufficiostampa-attachment"
      noWrapper={true}
      tag="div"
    >
      <Icon
        icon={iconClass}
        alt={intl.formatMessage(messages.attachment)}
        title={intl.formatMessage(messages.attachment)}
      />
      <CardBody tag="div" className="d-flex">
        <CardTitle className="h5">
          <UniversalLink
            item={{
              ..._item,
              '@id': itemURL,
            }}
            title={title}
            aria-label={title}
          >
            {title}
          </UniversalLink>
        </CardTitle>
        {description && <p>{description}</p>}
        {item['@type'] === 'Image' && (
          <div className="attachment-img-wrap ms-auto">
            <img
              className=""
              src={`${flattenToAppURL(item.url)}/@@images/image/thumb`}
              alt={item.title}
              aria-hidden="true"
              loading="lazy"
            />
          </div>
        )}
      </CardBody>
    </Card>
  );
};
UfficioStampaAttachment.propTypes = {
  item: PropTypes.object,
};

export default UfficioStampaAttachment;
