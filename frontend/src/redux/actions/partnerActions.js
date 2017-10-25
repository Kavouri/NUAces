<<<<<<< HEAD
import { getPartners } from '../api/partnerApi';

=======
>>>>>>> b36afb98ca1ed5d3c3352ddb84f7e52df4539fc7
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
<<<<<<< HEAD
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

export { fetchPartners };
=======
  };
};

export { receivePartners, requestPartners };
>>>>>>> b36afb98ca1ed5d3c3352ddb84f7e52df4539fc7
