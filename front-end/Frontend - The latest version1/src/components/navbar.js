import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';
import homeIcon from './images/ECO_SWEEP.png';

function Navbar() {
    console.log('Rendering Navbar');

    const location = useLocation();

    const shouldShowNavbar = () => {
        return location.pathname !== '/login'
      };

if (shouldShowNavbar()) {
  return (
    <nav className="navbar">
      <ul>
        <li>
        <Link to="/" className ="home-button2">
        <img src={homeIcon} alt="Home"/>
        </Link>
        </li>
    {/* Add more left-aligned buttons as needed */}
    </ul>
        <Link to="/login" className="joinus-button">Join Us</Link>
    </nav>
  );
}
return null;
}

export default Navbar;
