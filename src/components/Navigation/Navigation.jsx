import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">LOGIN TO STEAM</li>
        <li className="navigation__item">
          <Link to="/about" className="navigation__link">
            ABOUT
          </Link>
        </li>
        <li className="navigation__item">
          <a
            className="navigation__link"
            href="https://github.com/SDreadnoug2/game-picker-frontend"
            target="blank"
          >
            GITHUB
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
