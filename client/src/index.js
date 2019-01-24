import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers'; //automatcally gets index.js store

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './components/theme';
import CssBaseline from '@material-ui/core/CssBaseline';
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.querySelector('#root')
);
