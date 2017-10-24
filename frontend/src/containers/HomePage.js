import { connect } from 'react-redux';
import HomePageView from '../views/HomePageView';

const mapStateToProps = (state) => {
  return {
    partners: state.partners,
  };
};

const HomePage = connect(mapStateToProps)(HomePageView);

export default HomePage;
