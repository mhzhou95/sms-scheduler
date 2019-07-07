import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetSMS } from './actions/sms';
import { startRemoveSMS } from './actions/sms';
import moment from 'moment';
import Nexmo from 'nexmo';
import './styles/styles.scss';
import './firebase/firebase';
import * as serviceWorker from './serviceWorker';

//Nexmo
const nexmo = new Nexmo({
  apiKey: process.env.REACT_APP_NEXMO_API_PUBLIC,
  apiSecret: process.env.REACT_APP_NEXMO_API_SECRET,
});
const from = '16282541072';
const to = '12679922977';

// store
const store = configureStore();

const jsx = (
  <Provider store ={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(<p>Loading ...</p> , document.getElementById('root'));

store.dispatch(startSetSMS()).then(()=> {
  ReactDOM.render(jsx , document.getElementById('root'));
})

setInterval(()=>{
  store.getState().texts.forEach((text)=>{
    if( moment(text.sendAt) <= moment().valueOf() ){
      nexmo.message.sendSms(from, to, text.message);
      store.dispatch(startRemoveSMS({id: text.id}))
    }
  })
}, 10000);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
