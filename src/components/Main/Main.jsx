import { useState, useEffect, useContext } from "react";
import "./Main.css";
import steamSVG from "../../../public/assets/images/steam.svg";
import { AnimatePresence, motion } from "framer-motion";
function Main({ navigate }) {
  const handleButtonClick = () => navigate("/libraries");

  return (
    <div className="main">
      <button
        type="button"
        className="main__continue"
        onClick={handleButtonClick}
      >
        click to continue
      </button>
      <AnimatePresence>
        <motion.img
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -200 }}
          className="main__image"
          src={steamSVG}
          alt="steam logo"
        />
      </AnimatePresence>
    </div>
  );
}

export default Main;
