import React, { useState, useEffect } from 'react';
import './scrollIndicator.css';

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setIsVisible(scrolled === 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`scroll-indicator ${isVisible ? 'visible' : 'hidden'}`}
      onClick={scrollToTop}
    >
      ⬆ Scroll Up
    </div>
  );
};

export default ScrollIndicator;
