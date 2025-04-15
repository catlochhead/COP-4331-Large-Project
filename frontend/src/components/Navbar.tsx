import React, { useState } from 'react';
import logo from './logo.png';  // Adjust path if needed
import { Album } from '../types/Album';

type NavbarProps = {
  setSearchResults: (albums: Album[] | null) => void;
};

const Navbar: React.FC<NavbarProps> = ({ setSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const searchAlbums = async (query: string) => {
    try {
      const response = await fetch(`http://localhost:5500/api/albums/search?q=${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      const results = await response.json();

      if (response.ok) {
        setSearchResults(results); // Pass results to FavoritesPage
      } else {
        console.error('Search failed:', results);
        setSearchResults(null);
      }
    } catch (err) {
      console.error('Search failed:', err);
      setSearchResults(null);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setSearchResults(null);
    } else {
      searchAlbums(query);
    }
  };

  const doLogout = async () => {
    try {
      const response = await fetch("http://localhost:5500/api/logout", {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        window.location.href = '/login';
      } else {
        console.error("Logout failed");
      }
    } catch (error: any) {
      alert(error.toString());
    }
  };

  return (
    <nav className="navbar">
      <div className="brand">
        <img src={logo} alt="Record" className="logo-image" />
      </div>
      <div className="search-container">
        <input 
          type="text" 
          className="search-bar" 
          placeholder="Search albums..." 
          value={searchQuery} 
          onChange={handleSearchChange} 
        />
      </div>
      <button onClick={doLogout} className="logout-btn">Logout</button>
    </nav>
  );
};

export default Navbar;
