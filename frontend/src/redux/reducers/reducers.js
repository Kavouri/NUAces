import { combineReducers } from 'redux';
import { SUCCESSFUL_LOGIN, ADD_EVENT, REGISTER_FOR_EVENT } from '../actions/actions';
import { REQUEST_PARTNERS, RECEIVE_PARTNERS } from '../actions/partnerActions';

// Reducer for adding partners.
// We still need to add the async post.
export function partners(state = { isFetchingPartners: false, partnerList: [], receivedAt: '' }, action) {
  switch (action.type) {
    case REQUEST_PARTNERS:
      return Object.assign({}, state, { isFetchingPartners: true });
    case RECEIVE_PARTNERS:
      return {
        isFetchingPartners: false,
        partnerList: action.partners,
        receivedAt: action.receivedAt
      };
    default:
      return state;
  }
}

// Reducer for adding and registering for events. We will need to
// add async posts to the backend as well.
export function events(state = {}, action) {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        [action.eventData.eventId]: action.eventData,
      };
    case REGISTER_FOR_EVENT:
      return {
        ...state,
        [action.eventData.eventId]:
        {
          ...action.eventData,
          attending: true
        }
      };
    default:
      return state;
  }
};

export function login(state = {}, action) {
  switch (action.type) {
    case SUCCESSFUL_LOGIN:
      console.log('here');
      console.log(action.user);
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
};

const reducers = combineReducers({ partners, events });

export default reducers;
