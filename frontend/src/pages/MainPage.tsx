import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import Navbar from '../components/Navbar';
import AlbumGrid from '../components/AlbumGrid';
import Sidebar from '../components/Sidebar';
import { Album } from '../types/Album';

function App() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [userId, setUserId] = useState<string | null>(null); // state to hold userId

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const params = new URLSearchParams();
        params.append('query', searchQuery); // Sending the query for search

        const response = await fetch(`http://localhost:5500/api/albums/search?=:id}`, {
          credentials: 'include',
        });

        if (!response.ok) throw new Error('Failed to fetch albums');

        const data: Album[] = await response.json();
        setAlbums(data);
      } catch (err) {
        console.error('Error fetching albums:', err);
      }
    };

    fetchAlbums();
  }, [searchQuery]); // Trigger effect when searchQuery changes

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch('http://localhost:5500/api/current_user', {
          credentials: 'include', // Include cookies if you're using sessions
        });
  
        if (!response.ok) throw new Error('Failed to fetch user data');
  
        const data = await response.json();
        setUserId(data.userId);  // Assuming 'data' contains the userId
      } catch (err) {
        console.error('Error fetching user ID:', err);
      }
    };
  
    fetchUserId();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Update search query state
  };

  const toggleFavorite = (albumId: string) => { // Change to string to match _id type
    setAlbums(albums.map(album => 
      album._id === albumId ? { ...album, isFavorite: !album.isFavorite } : album
    ));
  };

  const updateAlbum = (updatedAlbum: Album) => {
    setAlbums(albums.map(album => 
      album._id === updatedAlbum._id ? updatedAlbum : album
    ));
  };

  const deleteAlbum = (albumId: string) => { // Change to string to match _id type
    setAlbums(albums.filter(album => album._id !== albumId));
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="content-container">
        <Navbar />
        <div className="main-content">
          {/* 🔍 Search Bar */}
          <input
            type="text"
            placeholder="Search by _id..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-bar"
          />
          
          {/* UserId Display */}
          <div className="user-info">
            <p>User ID: {userId}</p> {/* This will display the userId */}
          </div>

          <AlbumGrid 
            albums={albums}
            toggleFavorite={toggleFavorite}
            updateAlbum={updateAlbum}
            deleteAlbum={deleteAlbum}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
