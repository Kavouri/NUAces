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
  };
};

export { receivePartners, requestPartners };
