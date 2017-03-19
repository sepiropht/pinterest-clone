import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import devsToolsEnhancer from "remote-redux-devtools";
import "./index.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Images from "./reducers/Images";
let store = createStore(Images, devsToolsEnhancer());
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
