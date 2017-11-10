import { request } from '../../lib/requestWrapper';

const getPartners = () => request('/partner', 'get');

const addPartner = data => request('/partner', 'post', data);

const partnerApi = { addPartner, getPartners };

export default partnerApi;
