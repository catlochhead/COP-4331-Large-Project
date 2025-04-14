import React, { useState } from 'react';
// Import the image
import logo from './logo.png';  // Adjust path if needed

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query
  const [searchResults, setSearchResults] = useState<any[]>([]); // State to store search results
  
  // Handle the search API call
  const searchAlbums = async (query: string) => {
    try {
      const userId = localStorage.getItem('userId'); // Assuming the userId is stored in localStorage
      console.log('User ID:', userId);

      if (!userId) {
        console.error('No userId found');
        return;
      }
      
      const response = await fetch(`http://localhost:5500/api/albums/search?q=${query}&userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const results = await response.json();
  
      if (response.ok) {
        setSearchResults(results);
      } else {
        console.error('Search failed:', results);
        setSearchResults([]);
      }
    } catch (err) {
      console.error('Search failed:', err);
      setSearchResults([]);
    }
  };
  

  // Handle input change in the search bar
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);  // Update the query state
    searchAlbums(query);  // Call search API
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
      <button className="logout-btn">Logout</button>

      {/* Display search results if any */}
      <div className="search-results">
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((album) => (
              <li key={album._id}>{album.title} by {album.artist}</li>
            ))}
          </ul>
        ) : (
          <p>No albums found</p>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
