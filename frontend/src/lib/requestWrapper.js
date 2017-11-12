import rp from 'request-promise';

const request = (relativeUrl, method, data = {}) => {
  const absoluteUrl = process.env.REACT_APP_BASE_URL + relativeUrl;
  const options = {
    url: absoluteUrl,
    json: true,
    form: data
  };
  return rp[method.toLowerCase()](options);
}

export { request };