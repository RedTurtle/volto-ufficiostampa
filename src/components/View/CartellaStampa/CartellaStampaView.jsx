/**
 * CartellaStampaView view component.
 * @module components/View/CartellaStampaView
 */

import React from 'react';

import PropTypes from 'prop-types';
import {
  PageHeader,
  SkipToMainContent,
} from 'design-comuni-plone-theme/components/ItaliaTheme/View';
import UfficioStampaAttachment from 'volto-ufficiostampa/components/manage/UfficioStampaAttachment/UfficioStampaAttachment';

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
                <UfficioStampaAttachment key={i} item={item} />
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
