import { partners, login, events } from '../../../redux/reducers/reducers';
import { REQUEST_PARTNERS, RECEIVE_PARTNERS } from '../../../redux/actions/partnerActions';
import { SUCCESSFUL_LOGIN, ADD_EVENT, REGISTER_FOR_EVENT } from '../../../redux/actions/actions';

let initialState;
beforeEach(() => {
  initialState = { isFetchingPartners: false, partnerList: [], receivedAt: '' };
});

describe('reducers', () => {
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
  describe('login', () => {
    it('adds the user object to the state', () => {
      expect(login({}, { type: SUCCESSFUL_LOGIN, user: { name: 'Tighe' }})).toEqual({
        user: { name: 'Tighe'}
      });
    });
    it('returns intitial state in the default case', () => {
      expect(login({name: 'Tighe'}, {})).toEqual({ name: 'Tighe' });
    });
  });
  describe('events', () => {
    it('adds an event to the state', () => {
      expect(events(null, { type: ADD_EVENT, eventData: { name: 'Marathon', eventId: 'marathonId' }})).toEqual({
          marathonId: { name: 'Marathon', eventId: 'marathonId' }
      });
    });
    it('registers for an event', () => {
      expect(events({ marathonId: { name: 'Marathon', eventId: 'marathonId' }}, { type: REGISTER_FOR_EVENT, eventData: { eventId: 'marathonId', name: 'Marathon' }})).toEqual({
        marathonId: { name: 'Marathon', eventId: 'marathonId', attending: true }
      });
    })
  });
});
