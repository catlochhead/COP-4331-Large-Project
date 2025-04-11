import React from 'react';
// Import the image
import logo from './logo.png';  // Adjust path if needed

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="brand">
        <img src={logo} alt="Record" className="logo-image" />
      </div>
      <div className="search-container">
        <input type="text" className="search-bar" placeholder="Search albums..." />
      </div>
      <button className="logout-btn">Logout</button>
    </nav>
  );
};

export default Navbar;