import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './components/app';
import Choose from './components/choose'
import reducers from './reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { middleware as asyncTool } from 'redux-pack';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, {} ,composeEnhancers(applyMiddleware(thunk, asyncTool, logger)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/choose" component={Choose} />

        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('app'));
