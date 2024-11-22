import { useState } from 'react'
import './Header.css'
import Navigation from '../Navigation/Navigation'

function Header({navigate}) {

  return (
      <div className='header'>
        <h2 className='header__logo' onClick={() => navigate("/")}>GAME PICKER</h2>
        <Navigation/>
      </div>
  )
}

export default Header