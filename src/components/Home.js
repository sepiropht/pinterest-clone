import React, { Component } from "react";
import "../App.css";
import Image from "./Image";
import { connect } from "react-redux";
import { loadImages } from "../actions/Images";
import {
  CSSGrid,
  measureItems,
  makeResponsive,
  layout
} from "react-stonecutter";

const Grid = makeResponsive(measureItems(CSSGrid, { measureImages: true }), {
  maxWidth: 1920,
  minPadding: 100
});

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
        <Grid
          component="ul"
          columns={4}
          columnWidth={250}
          gutterWidth={5}
          gutterHeight={10}
          layout={layout.pinterest}
          duration={800}
          easing="ease-out"
          springConfig={{ stiffness: 170, damping: 26 }}
        >
          {ImagesCollection}
        </Grid>
      </div>
    );
  }
}

const Home = connect(mapStateToProps, mapDispatchToProps)(home);
export default Home;
