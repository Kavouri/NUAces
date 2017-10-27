import { partners } from '../../../redux/reducers/reducers';
import { REQUEST_PARTNERS, RECEIVE_PARTNERS } from '../../../redux/actions/partnerActions';

let initialState;
beforeEach(() => {
  initialState = { isFetchingPartners: false, partnerList: [], receivedAt: '' };
});

describe('partners', () => {
  it('handles fetching partners correctly', () => {
    const requestPartnersState = partners(initialState, { type: REQUEST_PARTNERS });
    expect(requestPartnersState).toEqual({
      isFetchingPartners: true,
      partnerList: [],
      receivedAt: ''
    });
  });
  it('adds fetched partners to the state properly', () => {
    initialState.isFetchingPartners = true;
    const receivePartnersState = partners(initialState, { type: RECEIVE_PARTNERS, partners: ['partner1', 'partner2'], receivedAt: 'today' });
    expect(receivePartnersState).toEqual({
      isFetchingPartners: false,
      partnerList: ['partner1', 'partner2'],
      receivedAt: 'today'
    });
  });
});
