import _ from 'lodash';
import { combineReducers } from 'redux';
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
