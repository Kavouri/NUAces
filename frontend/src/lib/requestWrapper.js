import rp from 'request-promise';

const request = (relativeUrl, method, data = {}) => {
  const absoluteUrl = process.env.REACT_APP_BASE_URL + relativeUrl;
  console.log(absoluteUrl);
  const options = {
    url: absoluteUrl,
    json: true,
    data,
  };
  return rp[method.toLowerCase()](options);
}

export { request };