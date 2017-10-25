<<<<<<< HEAD
import React from 'react';
import PropTypes from 'prop-types';

const HomePageView = ({ partners }) => {
  return partners ? partners.map(partner => <li key={partner.id}>{partner.name}</li>) : <div />;
};

HomePageView.propTypes = {
  partners: PropTypes.arrayOf(PropTypes.object),
};

HomePageView.defaultProps = {
  partners: [],
=======
import React, { PropTypes } from 'react';

const HomePageView = ({ partners }) => (
  <ul>
    {partners.map(partner => <li key={partner.id}>{partner.name}</li>)}
  </ul>);

HomePageView.propTypes = {
  partners: React.PropTypes.arrayOf(PropTypes.object).isRequired,
>>>>>>> b36afb98ca1ed5d3c3352ddb84f7e52df4539fc7
};

export default HomePageView;
