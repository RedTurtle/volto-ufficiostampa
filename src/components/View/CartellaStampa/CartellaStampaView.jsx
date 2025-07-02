/**
 * CartellaStampaView view component.
 * @module components/View/CartellaStampaView
 */

import React from 'react';

import PropTypes from 'prop-types';
import { Card, CardBody, CardTitle } from 'design-react-kit';
import {
  PageHeader,
  SkipToMainContent,
  Attachment,
} from 'design-comuni-plone-theme/components/ItaliaTheme/View';
import { Icon } from 'design-comuni-plone-theme/components/ItaliaTheme';
import { UniversalLink } from '@plone/volto/components';
import './cartella_stampa.scss';

const CartellaStampaItem = ({ item }) => {
  const download_url =
    item['@id'] +
    (item['@type'] === 'File'
      ? '/@@download/file'
      : item['@type'] === 'Image'
        ? '/@@download/image'
        : '');

  return item['@type'] === 'File' || item['@type'] === 'Image' ? (
    <Attachment
      key={item['@id']}
      title={item.title}
      description={item.description}
      download_url={download_url}
      item={item}
    />
  ) : (
    <Card
      className="card card-teaser shadow p-4 mt-3 rounded attachment"
      noWrapper={true}
      tag="div"
    >
      <Icon className={undefined} icon={'it-file'} padding={false} />
      <CardBody>
        <CardTitle className="title h5">
          <UniversalLink
            item={{
              ...item,
              '@id': item.url.replace(/\/view$/, ''),
            }}
            rel="noopener noreferrer"
          >
            {item.title}
          </UniversalLink>
        </CardTitle>
      </CardBody>
    </Card>
  );
};
/**
 * CartellaStampaView view component class.
 * @function CartellaStampaView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const CartellaStampaView = ({ content }) => {
  return (
    <>
      <div className="container px-4 my-4 bando-view cartella-stampa-view">
        <SkipToMainContent />
        <PageHeader
          content={content}
          readingtime={null}
          showreadingtime={false}
          imageinheader={!!content.image}
          imageinheader_field={'image'}
          showdates={false}
          showtassonomiaargomenti={false}
        />

        <div className="row row-column-border border-light">
          <section
            className="col-lg-12 it-page-sections-container"
            id="main-content-section"
          >
            <div className="card-wrapper card-teaser-wrapper card-teaser-wrapper-equal">
              {content.items.map((item, i) => (
                <CartellaStampaItem item={item} key={i} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

CartellaStampaView.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default CartellaStampaView;
