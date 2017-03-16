import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import { createStore } from "redux";
import Images from "./reducers/Images";
import devsToolsEnhancer from "remote-redux-devtools";
import { Provider } from "react-redux";
import { loadImages } from "./actions/Images";
import Profil from "./components/Profil";
import { Button, Modal } from "./components/Modal/modal";

let store = createStore(Images, devsToolsEnhancer());
const App = () => (
  <Provider store={store}>
    <Router>
      <div className="App">
        <div className="App-header">
          <h2><Link to="/">Welcome to Pinterest-clone</Link></h2>
          <Button />
        </div>
        <Route exact path="/" component={Home} />
        <Route exact path="/profil/:id" component={Profil} />
        <Route exact path="/modal/" component={Modal} />
      </div>
    </Router>
  </Provider>
);

export default App;
