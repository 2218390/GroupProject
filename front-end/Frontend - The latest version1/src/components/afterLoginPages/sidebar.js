import React from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { RxArrowRight } from "react-icons/rx";
import { LuLogOut } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineHome } from "react-icons/md";

import './sidebar.css';

function Sidebar({ isOpen, toggle }) {
    return (
    <nav className={`sidebar ${isOpen ? 'active' : ''}`}>
        <div className= "close-button_area">
         <button className="close-button" onClick={toggle}>
          <RxArrowRight />
         </button>
         <Link to="/homepage" className="home-button3">
          <button className="home-button3pp">
           <MdOutlineHome />
          </button>
         </Link>
        </div>
       <div className="sidebar-list">
        <div className="sidebar-item">
          <Link to="/postevent" className="sidebar-link">
            <AiIcons.AiOutlineFileAdd />
            <span>Post Event</span>
          </Link>
        </div>
        <div className="sidebar-item">
          <Link to="/manage" className="sidebar-link">
            <AiIcons.AiOutlineUnorderedList />
            <span>My Events</span>
          </Link>
          </div>
        <div className="sidebar-item">
          <Link to="/myapplications" className="sidebar-link">
            <AiIcons.AiOutlineAppstore />
            <span>My Applications</span>
          </Link>
        </div>
        <div className="sidebar-item">
          <Link to="/favourites" className="sidebar-link">
          <FaRegHeart />
            <span>Favourites</span>
          </Link>
        </div>
    </div>
    <div className="sidebar-item">
        <div className='logout_button1'>
          <Link to="/" className="sidebar-link">
          <LuLogOut />
            <span>Logout</span>
          </Link>
        </div>
        </div>
    </nav>
    );
  };
  
  export default Sidebar;
