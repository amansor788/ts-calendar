import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import {createBrowserHistory} from 'history';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

import App from './App';

const middlewares = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  );
  
const store = createStore(reducers, {}, middlewares);

ReactDOM.render(
    <Provider store={store}>
      <Router history={createBrowserHistory()}>
        <Route path="/" component={App}/>
      </Router>
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();
