import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import partnerApi from '../../../redux/api/partnerApi';
import { fetchPartners, requestPartners, receivePartners, REQUEST_PARTNERS, RECEIVE_PARTNERS } from '../../../redux/actions/partnerActions';
import { mockFunction, restoreAllMocks } from '../../../lib/testingUtils';

let mockStore;
let partners;
let store;
beforeEach(() => {
  partners = ['partner1', 'partner2'];
  mockStore = configureMockStore([thunk]);
  mockFunction(Date, 'now', () => 'date-now');
  mockFunction(partnerApi, 'getPartners', () => Promise.resolve(partners));
});
afterEach(() => {
  restoreAllMocks();
});

describe('partnerActions', () => {
  describe('requestPartners', () => {
    it('sends the appropriate data to the store', () => {
      const requestAction = requestPartners();
      expect(requestAction).toEqual({ type: REQUEST_PARTNERS, isFetchingPartners: true });
    });
  });
  describe('receivePartners', () => {
    it('sends the appropriate data to the store', () => {
      expect(receivePartners(partners)).toEqual({
        type: RECEIVE_PARTNERS,
        isFetchingPartners: false,
        partners,
        receivedAt: 'date-now',
      });
    });
  });
  describe('fetchPartners', () => {
    it('triggers the appropriate actions', () => {
      const expectedActions = [
        { type: REQUEST_PARTNERS, isFetchingPartners: true },
        {
          type: RECEIVE_PARTNERS,
          isFetchingPartners: false,
          partners,
          receivedAt: 'date-now',
        },
      ];
      store = mockStore({ partners: [] });
      return store.dispatch(fetchPartners()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
