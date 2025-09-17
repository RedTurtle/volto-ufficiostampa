import React from 'react';
import PropTypes from 'prop-types';
import Body from 'volto-ufficiostampa/components/blocks/SearchComunicati/Body';
import './styles.scss';

const View = ({ data, id, path, properties, block }) => {
  return (
    <div className="search-comunicati">
      <Body data={data} id={id} properties={properties} block={block} />
    </div>
  );
};
/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  id: PropTypes.string.isRequired,
};

export default View;
