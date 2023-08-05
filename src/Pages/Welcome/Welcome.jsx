import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import './Welcome.css'
function Welcome() {
  // localStorage.clear()
  return (
    <div className='welcome_container'>
      <img className="logo" src={logo} />
      <h3>Welcome to our streamlined todo list app, your ultimate tool for efficient task management and productivity. Let's get organized!</h3>
      <Link className='link' to="/homepage" >Start</Link>
    </div>
  )
}

export default Welcome