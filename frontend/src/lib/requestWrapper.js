import rp from 'request-promise';

export default function (url, method, data = {}) {
  const options = {
    url,
    json: true,
    data,
  };
  return rp[method](options);
}
