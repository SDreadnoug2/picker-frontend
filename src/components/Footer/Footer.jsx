import { useState } from 'react'
import './Footer.css'

function Footer() {

  return (
    <div className="footer">
      <p className="footer__text">Game Picker developed 2024 by Nicholas M</p>
      <div className="footer__socials">
        <a href='https://github.com/SDreadnoug2' className="footer__link">Github</a>
        <a href='https://www.linkedin.com/in/nicholas-m-a75b46168/' className="footer__link">Linkedin</a>
      </div>
    </div>
  )
}

export default Footer