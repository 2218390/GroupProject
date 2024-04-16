import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './footer.css';


function Footer() {
    console.log('Rendering Footer');

    const location = useLocation();

const shouldShowFooter = () => {
  return location.pathname !== '/login'
};
   
    return (
        <div className='footer'>
        <div className = 'description2'>

          </div>
        </div>
      );
}

export default Footer;