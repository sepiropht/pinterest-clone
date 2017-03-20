/* eslint-disable no-console, no-use-before-define */

import path from "path";
import Express from "express";
import qs from "qs";

import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackConfig from "../../webpack.config";

import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import devsToolsEnhancer from "remote-redux-devtools";
//import configureStore from "../common/store/configureStore";
import App from "../App";
//import { fetchCounter } from '../common/api/counter'
import { createStore } from "redux";
import Images from "../reducers/Images";
import { StaticRouter as Router } from "react-router-dom";
const app = new Express();
const port = 3000;
const store = createStore(Images, devsToolsEnhancer());
// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig);
app.use(
  webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  })
);
app.use(webpackHotMiddleware(compiler));

// This is fired every time the server side receives a request
app.use(handleRender);
app.use("/static", Express.static(__dirname + "/public"));
function handleRender(req, res) {
  // Query our mock API asynchronously
  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <Router location={req.url} context={{}}>
        <App />
      </Router>

    </Provider>
  );

  // Grab the initial state from our Redux store
  const finalState = store.getState();

  // Send the rendered page back to the client
  res.send(renderFullPage(html, finalState));
}

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Pinterest-clone</title>
        <link rel="stylesheet" href="/static/App.css">
        <link rel="stylesheet" href="/static/index.css">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, "\\x3c")}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `;
}

app.listen(port, error => {
  if (error) {
    console.error(error);
  } else {
    console.info(
      `==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`
    );
  }
});
