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
import { LOGGED_IN, LOGGED_OUT } from "../actions/User";
import { StaticRouter as Router } from "react-router-dom";
import { combineReducers } from "redux";
import mongoose from "mongoose";
import UserModel from "./models/user";
import ImageModel from "./models/image";
import cuid from "cuid";

const app = new Express();
const port = 4000;
const initState = combineReducers({
  Images,
  User
});

const db = mongoose.connection;

mongoose.connect(
  "mongodb://root:azerty@ds139480.mlab.com:39480/pinterest-clone"
);

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
app.use(bodyParser.urlencoded());
app.use(Express.static(path.join(__dirname, "static")));
function handleRender(req, res) {
  // Query our mock API asynchronously
  // Render the component to a string
  ImageModel.getImages((err, Images) => {
    if (err) console.log(err);
    store.dispatch({
      type: "LOAD_IMAGES",
      payload: Images
    });

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
  });
}

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Pinterest-clone</title>
        <link rel="stylesheet" href="App.css">
        <link rel="stylesheet" href="index.css">
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
        UserModel.getUserById(results.user_id, function(err, user) {
          if (err) console.log(err);
          console.log("user", user);
          if (user.length > 0) {
            store.dispatch({
              type: LOGGED_IN,
              payload: results
            });
            res.redirect("/");
          } else {
            const newUser = new UserModel(results);

            UserModel.create(newUser, (err, user) => {
              if (err) console.log(err);
              console.log("user was not in base", results);
              store.dispatch({
                type: LOGGED_IN,
                payload: results
              });
              res.redirect("/");
            });
          }
        });
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
  store.dispatch({
    type: LOGGED_OUT,
    payload: ""
  });
  res.redirect("/");
});
app.post("/image", (req, res) => {
  const newImages = new ImageModel({
    title: req.body.title,
    userId: req.body.userId,
    url: req.body.url
  });
  ImageModel.create(newImages, function(err, category) {
    if (err) {
      console.log(err);
    }
    res.json(newImages);
  });
});

app.get("/image/:userId", (req, res, next) => {
  ImageModel.getImagesByUserId(req.params.userId, (err, Images) => {
    if (err) console.log(err);

    res.json(Images);
  });
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
