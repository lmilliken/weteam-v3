import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers'; //automatcally gets index.js store

import { MuiThemeProvider } from '@material-ui/core';
import theme from './components/theme';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
//
ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.querySelector('#root')
);
