import React, { PropTypes } from 'react';

const HomePageView = ({ partners }) => (
  <ul>
    {partners.map(partner => <li key={partner.id}>{partner.name}</li>)}
  </ul>);

HomePageView.propTypes = {
  partners: React.PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HomePageView;
