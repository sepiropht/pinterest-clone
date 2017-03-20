/* eslint-disable no-console, no-use-before-define */

import path from "path";
import Express from "express";
import qs from "qs";
import oauth from "oauth";
import session from "cookie-session";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
//import conf from "../config";
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
import User from "../reducers/User";
import { LOGGED_IN } from "../actions/User";
import { StaticRouter as Router } from "react-router-dom";
import { combineReducers } from "redux";
const app = new Express();
const port = 4000;
const initState = combineReducers({
  Images,
  User
});

const store = createStore(initState, devsToolsEnhancer());
// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig);
app.use(
  webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  })
);
app.use(webpackHotMiddleware(compiler));
app.use(session({ keys: ["foo"] }));
app.use(bodyParser.json());
app.use(cookieParser());
// This is fired every time the server side receives a request
//app.use(handleRender);
app.use(Express.static(path.join(__dirname, "static")));
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

let oauthManager = new oauth.OAuth(
  "https://api.twitter.com/oauth/request_token",
  "https://api.twitter.com/oauth/access_token",
  "xLwdUeUNl8TMqRV78tWNLSJYr",
  "UwGLUxOQwe0iHLlOnbT45V8JxNGcMdbCsl8w2SF1KP4yao6Gow",
  "1.0A",
  "http://sepiropht.freeboxos.fr:4000" + "/login-callback",
  "HMAC-SHA1"
);
app.get("/login", function(req, res) {
  oauthManager.getOAuthRequestToken(function(err, token, secret, results) {
    if (err) {
      res.send("error getting request token: " + err);
    } else {
      req.session.oauth_token = token;
      req.session.oauth_secret = secret;
      res.redirect(
        "https://twitter.com/oauth/authenticate?oauth_token=" + token
      );
    }
  });
});
app.get("/login-callback", function(req, res) {
  req.session.oauth_verifier = req.query.oauth_verifier;

  oauthManager.getOAuthAccessToken(
    req.session.oauth_token,
    req.session.oauth_secret,
    req.session.oauth_verifier,
    function(err, accessToken, accessSecret, results) {
      if (err) {
        res.send("error getting access token: " + err);
      } else {
        req.session.username = results.screen_name;
        console.log(results);
        store.dispatch(LOGGED_IN);
        res.redirect("/");
      }
    }
  );
});
app.get("/", handleRender);
app.get("/logout", function(req, res) {
  req.session.oauth_verifier = null;
  req.session.oauth_token = null;
  req.session.oauth_secret = null;
  req.session.username = null;
  res.redirect("/");
});

app.listen(port, error => {
  if (error) {
    console.error(error);
  } else {
    console.info(
      `==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`
    );
  }
});
