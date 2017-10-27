import partnerApi from '../api/partnerApi';

const REQUEST_PARTNERS = 'REQUEST_PARTNERS';
const RECEIVE_PARTNERS = 'RECEIVE_PARTNERS';

const requestPartners = () => {
  return {
    type: REQUEST_PARTNERS,
    isFetchingPartners: true
  };
};

const receivePartners = (partners) => {
  return {
    type: RECEIVE_PARTNERS,
    isFetchingPartners: false,
    partners,
    receivedAt: Date.now()
  };
};

const fetchPartners = () => {
  return (dispatch) => {
    dispatch(requestPartners());
    return partnerApi.getPartners().then((partners) => {
      dispatch(receivePartners(partners));
    });
  };
};

export { fetchPartners, REQUEST_PARTNERS, RECEIVE_PARTNERS, receivePartners, requestPartners };
