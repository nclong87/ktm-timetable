import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = ({
  backgroundColor,
  iconSize,
  iconThickness,
}) => {
  Loading.propTypes = {
    backgroundColor: PropTypes.string,
    iconSize: PropTypes.number,
    iconThickness: PropTypes.number,
  };

  Loading.defaultProps = {
    backgroundColor: 'transparent',
    iconSize: 20,
    iconThickness: 3,
  };

  return (
    <div style={{ backgroundColor, margin: 'auto' }}><CircularProgress thickness={iconThickness} size={iconSize} color="primary" /></div>
  );
};

export default Loading;
