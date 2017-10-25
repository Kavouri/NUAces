import _ from 'lodash';
import { combineReducers } from 'redux';
<<<<<<< HEAD
import { ADD_EVENT, REGISTER_FOR_EVENT } from '../actions/actions';
import { REQUEST_PARTNERS, RECEIVE_PARTNERS } from '../actions/partnerActions';

// Reducer for adding partners.
// We still need to add the async post.
function partners(state = { isFetchingPartners: false, partnerList: [], receivedAt: '' }, action) {
  switch (action.type) {
    case REQUEST_PARTNERS:
      console.log('request partners');
      return {
        isFetchingPartners: true,
      };
    case RECEIVE_PARTNERS:
      console.log('receibve partners');
      return {
        isFetchingPartners: false,
        partnerList: action.partners,
        receivedAt: action.receivedAt,
      };
=======
import { ADD_PARTNER, ADD_EVENT, REGISTER_FOR_EVENT } from '../actions/actions';

// Reducer for adding partners.
// We still need to add the async post.
function partners(state = [], action) {
  switch (action.type) {
    case ADD_PARTNER:
      return [
        ...state,
        action.partnerInfo,
      ];
>>>>>>> b36afb98ca1ed5d3c3352ddb84f7e52df4539fc7
    default:
      return state;
  }
}

// Reducer for adding and registering for events. We will need to
// add async posts to the backend as well.
function events(state = {}, action) {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        [action.eventData.name]: action.eventData,
      };
    case REGISTER_FOR_EVENT:
      return _.map(state, (event) => {
        if (event.id === action.eventId) {
          return Object.assign({}, event, { attending: true });
        }
        return event;
      });
    default:
      return state;
  }
}

const reducers = combineReducers({ partners, events });

export default reducers;
