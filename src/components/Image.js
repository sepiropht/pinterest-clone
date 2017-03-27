import React from "react";
import { Link } from "react-router-dom";
const Image = props => {
  return (
    <div>
      <img className="picture" src={props.data.url} alt={"nothing"} />
      <h3 className="title">{props.data.title}</h3>
      <div className="footer">
        <Link to={"/profil/" + props.data.userId}>
          <img className="profile-picture" src="images.png" alt="nothing" />
        </Link>
        <button className="star" />
      </div>

    </div>
  );
};

export default Image;
