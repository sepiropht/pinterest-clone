import React from "react";
import { Route, Link } from "react-router-dom";
import Home from "./components/Home";
import { connect } from "react-redux";
import Profil from "./components/Profil";
import Modal from "./components/Modal/modal";
const mapStateToProps = state => ({ user: state.User });
const app = ({ user }) => (
  <div className="App">
    <div className="App-header">
      <h2><Link to="/">Welcome to Pinterest-clone</Link></h2>
      <h3
        style={user.logged ? { display: "none" } : {}}
        onClick={() => {
          window.location = "http://sepiropht.freeboxos.fr:4000/login";
        }}
      >
        Login
      </h3>
      <h3
        style={!user.logged ? { display: "none" } : {}}
        onClick={() => {
          window.location = "http://sepiropht.freeboxos.fr:4000/logout";
        }}
      >
        Logout
      </h3>

      <Modal style={!user.logged ? { display: "none!important" } : {}} />
    </div>
    <Route exact path="/" component={Home} />
    <Route path="/profil/:id" component={Profil} />
  </div>
);
const App = connect(mapStateToProps)(app);
export default App;
