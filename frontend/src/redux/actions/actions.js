

export const ADD_PARTNER = 'ADD_PARTNER';
export const ADD_EVENT = 'ADD_EVENT';
export const REGISTER_FOR_EVENT = 'REGISTER_FOR_EVENT';

export const addPartner = (partnerInfo) =>{ return { type: ADD_PARTNER, partnerInfo }; };
export const addEvent = (eventInfo) => { return { type: ADD_EVENT, eventInfo }; };
export const registerForEvent = (eventId) => { return { type: REGISTER_FOR_EVENT, eventId }; };
