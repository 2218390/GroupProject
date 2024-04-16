import React, { useState, useEffect } from 'react';
import Navbar from './navbar2.js';
import ListEvents from './ListEvents.js';
import './homepageAL.css';

function HPaL() {
    return (
        <div className='AppAL'>
            <Navbar/>
            <ListEvents/> 
        </div>
    );
}
export default HPaL;