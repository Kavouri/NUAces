import requestWrapper from '../../lib/requestWrapper';

const getPartners = () => requestWrapper(process.env.BASE_URL + '/partner', 'get');

const addPartner = data => requestWrapper('http://addpartnersendpoint', data);

const partnerApi = { addPartner, getPartners };

export default partnerApi;
