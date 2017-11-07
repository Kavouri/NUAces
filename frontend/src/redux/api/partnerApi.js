import requestWrapper from '../../lib/requestWrapper';

const getPartners = () => requestWrapper('/partner', 'get');

const addPartner = data => requestWrapper('/partner', 'post', data);

const partnerApi = { addPartner, getPartners };

export default partnerApi;
