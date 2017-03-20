import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./components/Home";

import { loadImages } from "./actions/Images";
import Profil from "./components/Profil";
import Modal from "./components/Modal/modal";

const App = () => (
  <div className="App">
    <div className="App-header">
      <h2><Link to="/">Welcome to Pinterest-clone</Link></h2>
      <Modal />
    </div>
    <Route exact path="/" component={Home} />
    <Route exact path="/profil/:id" component={Profil} />
  </div>
);

export default App;
