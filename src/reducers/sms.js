const smsReducerDefaultState = [];

const smsReducer = (state = smsReducerDefaultState , action) => {
  switch(action.type) {
    case 'ADD_SMS':
      return [...state, action.sms]
    case 'REMOVE_SMS':
      return state.filter((sms) => {
        return sms.id !== action.id
      })
    case 'EDIT_SMS':
      return state.map((sms)=> {
        if(sms.id === action.id){
          return {
            ...sms,
            ...action.updates
          }
        }else{ 
          return sms;
        }
      })
    default:
      return state;
  }
}

export default smsReducer;