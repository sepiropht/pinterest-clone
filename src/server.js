const express = require("express");
const app = express();
const oauth = require("oauth");
const session = require("cookie-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.get("/", function(req, res) {
  res.send("Hello World!");
});
app.use(session({ keys: ["foo"] }));
app.use(bodyParser.json());
app.use(cookieParser());

app.listen(4000, function() {
  console.log("Example app listening on port 4000!");
});

let oauthManager = new oauth.OAuth(
  "https://api.twitter.com/oauth/request_token",
  "https://api.twitter.com/oauth/access_token",
  "xLwdUeUNl8TMqRV78tWNLSJYr",
  "UwGLUxOQwe0iHLlOnbT45V8JxNGcMdbCsl8w2SF1KP4yao6Gow",
  "1.0A",
  "localhost:3000+/login-callback",
  "HMAC-SHA1"
);
app.get("/login", function(req, res) {
  oauthManager.getOAuthRequestToken(function(err, token, secret, results) {
    if (err) {
      res.send("error getting request token: " + err);
    } else {
      debugger;
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
        res.redirect("/");
      }
    }
  );
});

app.get("/logout", function(req, res) {
  req.session.oauth_verifier = null;
  req.session.oauth_token = null;
  req.session.oauth_secret = null;
  req.session.username = null;
  res.redirect("/");
});
