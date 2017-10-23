import requestWrapper from '../../lib/requestWrapper';

const getPartners = () => requestWrapper('http://getpartnersendpoint');

const addPartner = data => requestWrapper('http://addpartnersendpoint', data);

export { addPartner, getPartners };
