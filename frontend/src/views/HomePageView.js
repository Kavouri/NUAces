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
};

export default HomePageView;
