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
const preloadedState = window.__PRELOADED_STATE__;

const app = combineReducers({
  Images,
  User
});
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;
const store = createStore(app, preloadedState);
ReactDOM.render(
  <Provider store={store}>
    <Router><App /></Router>

  </Provider>,
  document.getElementById("root")
);
