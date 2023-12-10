import { Link } from "react-router-dom";
import "./nav.scss";

export default function Nav() {
  return (
    <>
      <div className="nav-component">
        <Link to="/">
          <span className="title">Unusual</span>
        </Link>
      </div>
    </>
  );
}
