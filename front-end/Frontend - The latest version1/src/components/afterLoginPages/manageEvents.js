import React from 'react';
import EventsByUser from './eventbyuser.js';
import Header from './navbar2.js';
import Footer from '../footer.js';

const App = () => {
    const userId = sessionStorage.getItem("userId");
    return (
        <div>
            <Header/>
            <EventsByUser userId={userId} />
            <Footer style={{ marginTop: 'auto' }}/>    
        </div>
    );
};

export default App;