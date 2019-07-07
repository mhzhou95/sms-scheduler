import { createStore, combineReducers } from 'redux';
import smsReducer from '../reducers/sms';

export default () => {
  const store = createStore(
    combineReducers( {
      texts: smsReducer
    })
  );
  return store;
}

