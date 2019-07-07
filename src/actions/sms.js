import database from '../firebase/firebase';

export const addSMS = ( sms ) => ({
  type: 'ADD_SMS',
  sms
});

export const startAddSMS = ( smsData = {} ) => {
  return (dispatch) => {
    const {
       number,
       message, 
       sendAt 
    } = smsData;
    const sms = { number, message, sendAt }
    database.ref('sms').push(sms).then((ref)=> {
      dispatch(addSMS({
        id: ref.key,
        ...sms
      }));
    })
  };
};

export const removeSMS = ( {id} = {}) => ({
  type: 'REMOVE_SMS',
  id
});

export const editSMS = (id, updates) => ({
  type: 'EDIT_SMS',
  id,
  updates
});


