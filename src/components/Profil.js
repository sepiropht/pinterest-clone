import React, { Component } from "react";
class Profil extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {}
  render() {
    return (
      <div className="container">
        <h1>Profil de {this.props.match.params.id}</h1>
      </div>
    );
  }
}

export default Profil;
