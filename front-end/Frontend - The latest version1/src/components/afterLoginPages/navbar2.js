import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {useEffect} from "react";
import './navbar2.css';
import {useState} from "react";
import homeIcon from '../images/ECO_SWEEP.png';
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import Sidebar from './sidebar.js';
import profileDefault from '../images/profile.png';

function Navbar() {
    console.log('Rendering Navbar2');
    const userId = sessionStorage.getItem("userId");
    const jwtToken = sessionStorage.getItem("jwt");
    const [user, setUser] = useState([]);
    const profileIcon = user.profilePicture ? `data:image/jpeg;base64,${user.profilePicture}` : profileDefault;
    const location = useLocation();
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/user/"+userId,{
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                });
                console.log(response.data);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const shouldShowNavbar = () => {
        return location.pathname !== '/components/login'
    };

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    if (shouldShowNavbar()) {
        return (
            <nav className="navbar2">
                <ul>
                    <li>
                        <Link to="/homepage" className ="home-button2" title='Home'>
                        <img src={homeIcon} alt="Home"/>
                        </Link>
                    </li>
                </ul>
                <Link to="/profile" className="profile-button" title='Profile'><img src={profileIcon}/></Link>
                <div className={`menu ${showSidebar ? 'active' : ''}`} onClick={toggleSidebar}>
                    <FaIcons.FaBars className={`menu-icon ${showSidebar ? 'active' : ''}`} />
                </div>
                <Sidebar isOpen={showSidebar} toggle={toggleSidebar} />
            </nav>
        );
    }
    return null;
}
export default Navbar;
