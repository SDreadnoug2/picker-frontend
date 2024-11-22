import {useState, useEffect, useContext} from 'react'
import './Main.css'
import steamSVG from "../../../public/assets/images/steam.svg";
import {AnimatePresence, motion} from "framer-motion";
function Main({navigate}) {

  const handleButtonClick = () => navigate('/libraries');

  return (
    
      <div className="main">
            <h2 className='main__subtitle'>NEW GAME?</h2>
        <h2 className="main__continue" onClick={handleButtonClick}>click to continue</h2>
        <AnimatePresence>
          <motion.img
            initial={{opacity: 0, y: 200}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -200}}
          className='main__image' 
          src={steamSVG} 
          alt="steam logo"/>
        </AnimatePresence>

      </div>
  )
}

export default Main
