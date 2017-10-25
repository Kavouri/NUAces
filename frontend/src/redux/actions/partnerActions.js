import { getPartners } from '../api/partnerApi';

export const REQUEST_PARTNERS = 'REQUEST_PARTNERS';
export const RECEIVE_PARTNERS = 'RECEIVE_PARTNERS';

const requestPartners = () => {
  return {
    type: REQUEST_PARTNERS,
    isFetchingPartners: true,
  };
};

const receivePartners = (partners) => {
  return {
    type: RECEIVE_PARTNERS,
    isFetchingPartners: false,
    partners,
    receivedAt: Date.now(),
  };
};

const fetchPartners = () => {
  return (dispatch) => {
    dispatch(requestPartners());
    return getPartners().then((partners) => {
      dispatch(receivePartners(partners));
    });
  };
};


export { fetchPartners, receivePartners, requestPartners };
