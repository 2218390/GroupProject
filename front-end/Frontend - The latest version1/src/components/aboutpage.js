import React from 'react';
import { Link } from 'react-router-dom';
import './aboutpage.css';

function AboutPage() {
    console.log('Rendering AboutPage');
   
    return (
        <div className='aboutpage'>
          <h1 className='abouttitle'>Our Mission</h1>
        <div className = 'description'>
          <p>In line with the United Nation's Sustainable Development Goals, EcoSweep aims to achieve goals 14 and 15; enhancing life on land and sea. </p>
          <p>Today, our irresponsible disposal of trash and plastics threatens the lives of animals all over the planet. It also decreases the quality of life for 70% of the global population.</p>
          <p>EcoSweep connects like-minded individuals, with the goal of taking action against this global issue.</p>
          <p>Together, we strive to build a community that advocates for a healthier planet, ensuring the well-being of current and future generations.</p>
          </div>
        <Link to="/login" className="login-button2">
          Be a part of the solution
        </Link>
        </div>
      );
}

export default AboutPage;