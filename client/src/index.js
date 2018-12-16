import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers'; //automatcally gets index.js store

import axios from 'axios';
window.axios = axios; //so that in the browser you can access axios by typing 'axios.post...', we are doing this to test the email functionality since Postman doesn't send the authentication cookies

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);

// console.log('stripe key: ', process.env.REACT_APP_STRIPE_KEY);

// console.log('environment: ', process.env.NODE_ENV);
