import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router,browserHistory} from 'react-router';
import configureStore from './store/configureStore';
import App from './components/App';

const store = configureStore(browserHistory)

const rootRoute = {
  path: '/',
  component: App, 		
  childRoutes: [
  	require('./routes/me'),
  ]
}

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={rootRoute}/>
  </Provider>,
  document.getElementById('app')
)