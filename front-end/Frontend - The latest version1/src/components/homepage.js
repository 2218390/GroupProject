import React from 'react';
import ImageSlider from './imageSlider.js';
import AboutPage from './aboutpage.js';
import ScrollIndicator from './scrollIndicator.js';
import Navbar from './navbar.js';
import Footer from './footer.js';

function HomePage() {
    console.log('Rendering HomePage');
   
    return (
      <>
      <Navbar />
        <div>
          <ImageSlider />
          <div><AboutPage /></div>
          <Footer style={{ marginTop: 'auto' }}/>
        </div>
        </>
      );
}


  export default HomePage;