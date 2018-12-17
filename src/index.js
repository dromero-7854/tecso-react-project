// Dependencies
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import Bluebird from 'bluebird';
import { Provider } from 'react-redux';

// Routes
import AppRoutes from './routes';

// Assets
import './index.css';

// Redux Store
import configureStore from './lib/configureStore';

// Reducers
import rootReducer from './reducers';

// Bluebird Setup
window.Promise = Bluebird;
Bluebird.config({ warnings: false });
window.addEventListener('unhandledrejection', error => {
  error.preventDefault();
  if (process.env.NODE_ENV !== 'production') {
    console.warn('Unhandled promise rejection warning', error.detail);
  }
});

// Redux Store Setup
const store = configureStore({
  initialState: window.initialState
}, rootReducer);

render(
  <Provider store={store}>
    <Router>
      <AppRoutes />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
