

export const ADD_PARTNER = 'ADD_PARTNER';
export const ADD_EVENT = 'ADD_EVENT';
export const REGISTER_FOR_EVENT = 'REGISTER_FOR_EVENT';
export const SUCCESSFUL_LOGIN = 'SUCCESSFUL_LOGIN';

export const addPartner = (partnerInfo) => { return { type: ADD_PARTNER, partnerInfo }; };
export const addEvent = (eventInfo) => { type: ADD_EVENT, eventInfo };
export const registerForEvent = (eventId) => { return { type: REGISTER_FOR_EVENT, eventId }; };

//Login
export const successfulLogin = (user) => { return { type: SUCCESSFUL_LOGIN, user: user }; };
