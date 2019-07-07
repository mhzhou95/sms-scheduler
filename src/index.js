import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addSMS } from './actions/sms';
import getVisibleSMS from './selectors/sms';
import './styles/styles.scss';
import * as serviceWorker from './serviceWorker';

const store = configureStore();

const state = store.getState();
const visibleSMS = getVisibleSMS(state.texts, state.filters);

console.log(visibleSMS);

console.log(store.getState());


const jsx = (
  <Provider store ={store}>
    <AppRouter />
  </Provider>
);
ReactDOM.render(jsx , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
