import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetSMS } from './actions/sms';
import { startRemoveSMS } from './actions/sms';
import moment from 'moment';
import './styles/styles.scss';
import './firebase/firebase';

const App = () => {
  //Nexmo
  // const Nexmo = require('nexmo');
  // const nexmo = new Nexmo(
  //   {
  //     apiKey: process.env.REACT_APP_NEXMO_API_PUBLIC,
  //     apiSecret: process.env.REACT_APP_NEXMO_API_SECRET
  //   },
  //   { debug: true }
  // );
  // const from = '16282541072';

  // store
  const store = configureStore();
  store.dispatch(startSetSMS());

  // loop for sending texts every 10 seconds
  setInterval(() => {
    store.getState().texts.forEach(text => {
      if (moment(text.sendAt) <= moment().valueOf()) {
        let number = '1';
        number += text.number;
        const request = require('request');
        request.post(
          'https://textbelt.com/text',
          {
            form: {
              phone: number,
              message: text.message,
              key: process.env.REACT_APP_TEXTBELT_API
            }
          },
          function(err, httpResponse, body) {
            if (err) {
              console.error('Error:', err);
              return;
            }
            console.log(JSON.parse(body));
          }
        );
        store.dispatch(startRemoveSMS({ id: text.id }));
      }
    });
  }, 31000);
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;