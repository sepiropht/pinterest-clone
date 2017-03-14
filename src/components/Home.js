import React, { Component } from "react";
import "../App.css";
import Image from "./Image";
import { connect } from "react-redux";
import { loadImages } from "../actions/Images";
const mapDispatchToProps = {
  loadImages: loadImages
};
const mapStateToProps = state => ({
  images: state
});
class home extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.loadImages();
  }
  render() {
    const ImagesCollection = this.props.images.map((image, index) => (
      <li key={index}>
        <Image img={`${image.link}`} alt="img" />
      </li>
    ));
    return (
      <div className="container">
        <ul>{ImagesCollection}</ul>
      </div>
    );
  }
}

const Home = connect(mapStateToProps, mapDispatchToProps)(home);
export default Home;
