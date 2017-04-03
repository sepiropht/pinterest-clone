import Link from "next/link";
const Image = props => {
  const me = "willo";
  return (
    <div>
      <img className="picture" src={props.data.url} alt={"nothing"} />
      <h3 className="title">{props.data.title}</h3>
      <div className="footer">
        <Link href="/profil/?id=willo" as="/profil/willo" prefetch>
          <a>
            <img className="profile-picture" src="images.png" alt="nothing" />
          </a>
        </Link>
        <button className="star" />
      </div>

    </div>
  );
};

export default Image;
