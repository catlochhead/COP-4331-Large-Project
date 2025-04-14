import React from 'react';
// Import the image
import logo from './logo.png';  // Adjust path if needed

const Navbar: React.FC = () => {

  async function doLogout(event: any): Promise<void> {
    try{
      console.log("doLogout")
      const response = await fetch("http://localhost:5500/api/logout", {
        method: 'POST',
        credentials: 'include'
      })
      console.log("doLogout2")
  
      if (!response.ok){
        console.log("error")
      } else {
        window.location.href = '/login';
      }
  
    } catch (error:any) {
      alert(error.toString());
      return;
    }
  
  } 

  return (
    <nav className="navbar">
      <div className="brand">
        <img src={logo} alt="Record" className="logo-image" />
      </div>
      <div className="search-container">
        <input type="text" className="search-bar" placeholder="Search albums..." />
      </div>
      <button onClick={doLogout} className="logout-btn">Logout</button>
    </nav>
  );
};

export default Navbar;