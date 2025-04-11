import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import miniLogo from './miniLogo.png';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      {/* Album/Home Icon */}
      <Link to="/" className="sidebar-logo" title="Go to Main Page">
  <img src={miniLogo} alt="Logo" />
</Link>
      <div
        className={`sidebar-icon ${location.pathname === '/' ? 'active' : ''}`}
        title="View Albums"
        onClick={() => navigate('/')}
      >
        {/* Home SVG */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3L20 9V21H15V14H9V21H4V9L12 3Z" 
                stroke="currentColor" strokeWidth="2" 
                strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="sidebar-divider"></div>

      {/* Add Album Icon */}
      <div
        className={`sidebar-icon ${location.pathname === '/create' ? 'active' : ''}`}
        title="Create Album"
        onClick={() => navigate('/create')}
      >
        {/* Plus SVG */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4V20M4 12H20" 
                stroke="currentColor" strokeWidth="2" 
                strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="sidebar-divider"></div>

      {/* Favorite Albums Icon */}
      <div
        className={`sidebar-icon ${location.pathname === '/favorites' ? 'active' : ''}`}
        title="Favorite Albums"
        onClick={() => navigate('/favorites')}
      >
        <span className="star-icon">★</span>
      </div>
    </div>
  );
};

export default Sidebar;
