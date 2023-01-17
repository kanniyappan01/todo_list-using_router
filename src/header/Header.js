import React from 'react'
import { Link } from 'react-router-dom'
import "./Header.scss"

function Header() {
  return (
    <div className='header'>
        <div className='container'>
            <div className='navbar'>
                <h1 className='header-logo'><Link to={"/home"}>Drak World</Link></h1>
                  <ul>
                    <li><Link to={"/home"}>HOME</Link></li>
                    <li><Link to={"/about?id=12&&name=arun"}>ABOUT</Link></li>
                    <li><Link to={"/service"}>SERVICE</Link></li>
                    <li><Link to={"/project"}>PROJECT</Link></li>
                    <li><Link to={"/contact"}>CONTACT</Link></li>
                  </ul>
            </div>
        </div>  
    </div>
  )
}

export default Header