import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <div className="logo-left">
          <span>Hey</span>
        </div>
        <div className="logo-right">
          <span>땡겨요</span>
          <div className="curly-line"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
