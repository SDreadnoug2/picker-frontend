import {useContext} from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { UserDataContext } from "../../contexts/userDataContext";
import { LoggedInContext } from "../../contexts/LoggedInContext";
function Navigation() {

  const userData = useContext(UserDataContext);
  const {isLoggedIn, logIn, logOut} = useContext(LoggedInContext);
  console.log(userData);
  return (
    <nav className="navigation">
      <ul className="navigation__list">
        {!isLoggedIn ? (
          <li className="navigation__item" onClick={logIn}>LOGIN TO STEAM</li>
        ) : (
          <>
            <li className="navigation__item">{userData.name}</li>
            <img className="navigation__image" src={userData.avatar}/>
            <li className="navigation__item" onClick={logOut}>LOG OUT</li>
          </>
        )
        }
      </ul>
    </nav>
  );
}

export default Navigation;
