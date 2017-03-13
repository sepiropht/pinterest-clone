import React from "react";
import image from "../images.png";
const Image = props => (
  <div>
    <img className="picture" src={props.img} alt={"nothing"} />
    <h3 className="title">title</h3>
    <div className="footer">
      <img className="profile-picture" src={image} alt="nothing" />
      <button className="star" />
    </div>

  </div>
);

export default Image;
