import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import smsReducer from '../reducers/sms';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers( {
      texts: smsReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
}

