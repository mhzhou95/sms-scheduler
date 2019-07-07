import uuid from 'uuid';

export const addSMS = ( { number, message, sendAt } = {} ) => ({
  type: 'ADD_SMS',
  sms: {
    id: uuid(),
    number,
    message, 
    sendAt
  }
});

export const removeSMS = ( {id} = {}) => ({
  type: 'REMOVE_SMS',
  id
});

export const editSMS = (id, updates) => ({
  type: 'EDIT_SMS',
  id,
  updates
});


