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

export const startRemoveSMS = ( { id  = {} }) => {
  return (dispatch) => {
    return database.ref(`sms/${id}`).remove().then(()=> {
      dispatch(removeSMS({id}));
    })
  }
}
export const editSMS = (id, updates) => ({
  type: 'EDIT_SMS',
  id,
  updates
});

export const startEditSMS = (id, updates) => {
  return (dispatch) => {
    return database.ref(`sms/${id}`).update(updates).then(()=> {
      dispatch(editSMS(id, updates));
    })
  }
}
// Grab SMS

export const setSMS = (texts) => ({
  type: "SET_SMS",
  texts
});

export const startSetSMS = () => {
  return (dispatch) => {
    return database.ref('sms').once('value').then((snapshot)=> {
      const texts = [];
      snapshot.forEach((childSnapShot)=> {
        texts.push({
          id: childSnapShot.key,
          ...childSnapShot.val()
        })
      });
      dispatch(setSMS(texts));
    })
  }
};

