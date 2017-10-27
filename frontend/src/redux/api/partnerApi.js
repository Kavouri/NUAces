import requestWrapper from '../../lib/requestWrapper';

const getPartners = () => requestWrapper('http://localhost:3001/partner', 'get');

const addPartner = data => requestWrapper('http://addpartnersendpoint', data);

const partnerApi = { addPartner, getPartners };

export default partnerApi;
