import { request } from '../../lib/requestWrapper';
import { mockFunction, restoreSingleMock } from '../../lib/testingUtils';
import rp from 'request-promise';

beforeEach(() => {
  mockFunction(rp, 'post');
});

afterEach(() => {
  restoreSingleMock('post');
})

describe('requestWrapper', () => {
  it('calls request promise with the correct parameters', () => {
    process.env.REACT_APP_BASE_URL = 'localhost';
    request('/login', 'post', { name: 'Tighe', password: 'password' });
    expect(rp.post).toHaveBeenCalled;
    expect(rp.post).toHaveBeenCalledWith({ url: 'localhost/login', json: true, data: { name: 'Tighe', password: 'password' }});
  });
});
