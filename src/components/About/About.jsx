import "./About.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
function About() {
  const navigate = useNavigate();

  return (
    <div className="about">
      <div className="about__container">
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="about__button"
        >
          <FontAwesomeIcon className="about__return" icon={faArrowLeft} />
        </button>
        <h1 className="about__title">What is Game Picker?</h1>
        <p className="about__text">
          Something new or something old, gamepicker's here to help. This app utilizes steam's API
          to find games either in your library, or on the steam store to try our or experience again.
          It'll even let you know if you've never even launched something in your library!
          The app was built in react, and utilizes framer motion, and the "passport-steam" repo on Github, by Liam Curry in order
          to store your steamID to request a list of games from your library. The server and site don't process or store any of your personal
          steam info, only your steamID, username, and avatar gets saved as a cookie in your browser, which is then deleted on log out.
          Please follow up with me on Github if you come across any issues.
          Hope you find something new!
          <br></br>
          P.S. A more mobile friendly site is in the works.
        </p>
        <p className="about__subtext">Nicholas</p>
      </div>
    </div>
  );
}

export default About;
