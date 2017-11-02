import React from 'react';
import { PropTypes } from 'prop-types';

const Error = props => (
  <div className="error-container inner-registration">
    {`ERROR: ${props.error}`}
  </div>
);

Error.propTypes = {
  error: PropTypes.string.isRequired
};

export default Error;
