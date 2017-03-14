import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import { createStore } from "redux";
import Images from "./reducers/Images";
import devsToolsEnhancer from "remote-redux-devtools";
import { Provider } from "react-redux";
import { loadImages } from "./actions/Images";
debugger;
let store = createStore(Images, devsToolsEnhancer());
const App = () => (
  <Provider store={store}>
    <Router>
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Pinterest-clone</h2>
        </div>
        <Route exact path="/" component={Home} />
      </div>
    </Router>
  </Provider>
);

export default App;
