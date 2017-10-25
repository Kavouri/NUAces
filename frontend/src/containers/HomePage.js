import { connect } from 'react-redux';
import HomePageView from '../views/HomePageView';

const mapStateToProps = (state) => {
  return {
<<<<<<< HEAD
    partners: state.partners.partnerList,
=======
    partners: state.partners,
>>>>>>> b36afb98ca1ed5d3c3352ddb84f7e52df4539fc7
  };
};

const HomePage = connect(mapStateToProps)(HomePageView);

export default HomePage;
