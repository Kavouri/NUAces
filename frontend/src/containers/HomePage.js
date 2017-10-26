import { connect } from 'react-redux';
import HomePageView from '../views/HomePageView';

export const mapStateToProps = (state) => {
  return {
    partners: state.partners.partnerList,
  };
};

const HomePage = connect(mapStateToProps)(HomePageView);

export default HomePage;
