import "./Header.css";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header({navigate}) {
  return (
    <div className="header">
      <ul className="header__list">      
        <li className="header__item">
        <Link to="/about" className="header__link">
            ABOUT
        </Link>
        </li>
        <li className="header__item">
          <a className="header__link" href="https://github.com/SDreadnoug2/picker-frontend" target="blank">GITHUB</a>
        </li>
      </ul>
      <h2 className="header__logo" onClick={() => navigate("/")}>
        PICKAGAME
      </h2>
      <Navigation className="header__user"/>
    </div>
  );
}

export default Header;
