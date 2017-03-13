import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import Image from "./components/Image";

const Images = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
  <li key={i}>
    <Image img={`http://lorempicsum.com/futurama/255/200/${i}`} alt="img" />
  </li>
));

const Home = () => (
  <div className="App">
    <div className="App-header">
      <h2>Welcome to Pinterest-clone</h2>
    </div>

    <div className="container">
      <ul>{Images}</ul>
    </div>

  </div>
);
const App = () => (
  <Router>
    <Route exact path="/" component={Home} />
  </Router>
);

export default App;
