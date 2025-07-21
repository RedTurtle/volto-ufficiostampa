import React from 'react';
import PropTypes from 'prop-types';
import Body from 'volto-ufficiostampa/components/blocks/SearchComunicati/Body';
import './styles.scss';

const Edit = ({ data, id, block, onChangeBlock, selected, pathname }) => {
  return (
    <div className="search-comunicati public-ui">
      <Body
        data={data}
        id={id}
        inEditMode={true}
        onChangeBlock={onChangeBlock}
      />
    </div>
  );
};
/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Edit.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  id: PropTypes.string.isRequired,
  block: PropTypes.string.isRequired,
  selected: PropTypes.any,
  intl: PropTypes.any,
  onChangeBlock: PropTypes.func.isRequired,
};

export default Edit;
