import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import devsToolsEnhancer from "remote-redux-devtools";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Images from "./reducers/Images";
import User from "./reducers/User";
import { combineReducers } from "redux";
import createHistory from "history/createBrowserHistory";
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
  push
} from "react-router-redux";

const preloadedState = window.__PRELOADED_STATE__;
const history = createHistory();

const app = combineReducers({
  Images: Images,
  User: User,
  router: routerReducer
});
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;
const store = createStore(app, preloadedState);
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router><App /></Router>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
