import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import devsToolsEnhancer from "remote-redux-devtools";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Images from "./reducers/Images";
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;
const store = createStore(Images, preloadedState);
ReactDOM.render(
  <Provider store={store}>
    <Router><App /></Router>

  </Provider>,
  document.getElementById("root")
);
