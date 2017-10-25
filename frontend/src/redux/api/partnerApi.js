import requestWrapper from '../../lib/requestWrapper';

<<<<<<< HEAD
const getPartners = () => requestWrapper('http://localhost:3001/partner', 'get');
=======
const getPartners = () => requestWrapper('http://getpartnersendpoint');
>>>>>>> b36afb98ca1ed5d3c3352ddb84f7e52df4539fc7

const addPartner = data => requestWrapper('http://addpartnersendpoint', data);

export { addPartner, getPartners };
