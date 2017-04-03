import React from "react";
import { connect } from "react-redux";
class Profil extends React.Component {
  static getInitialProps({ query: { id } }) {
    console.log(id, "Profil");
    return { id };
  }
  componentWillMount() {}
  render() {
    console.log("Profil", this.props);
    return (
      <div className="container">
        <h1>Profil de {this.props.id}</h1>
      </div>
    );
  }
}
const mapStateToProps = state => ({ user: state.User });
export default connect(mapStateToProps)(Profil);
