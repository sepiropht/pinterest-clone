import React, { Component } from "react";
import Image from "./Image";
import { connect } from "react-redux";
import {
  CSSGrid,
  measureItems,
  makeResponsive,
  layout
} from "react-stonecutter";
import { fetchImages } from "../actions/Images";
const Grid = makeResponsive(measureItems(CSSGrid, { measureImages: true }), {
  maxWidth: 1920,
  minPadding: 100
});

const mapStateToProps = state => ({
  images: state.Images
});

const mapDispatchToProps = dispatch => ({
  fetchImages: () => dispatch(fetchtImages())
});
class home extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    console.log(this.props);
    this.props.dispatch(fetchImages());
  }
  render() {
    console.log(this.props.images, "IMAGGGGE");
    const ImagesCollection = this.props.images.map((image, index) => (
      <li key={index}>
        <Image data={image} />
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

const Home = connect(mapStateToProps)(home);
export default Home;
