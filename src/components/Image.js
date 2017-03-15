import React from "react";
import image from "../images.png";
import { Link } from "react-router-dom";
const Image = props => (
  <div>
    <img className="picture" src={props.img} alt={"nothing"} />
    <h3 className="title">title</h3>
    <div className="footer">
      <Link to="/profil/me">
        <img className="profile-picture" src={image} alt="nothing" />
      </Link>
      <button className="star" />
    </div>

  </div>
);

export default Image;
