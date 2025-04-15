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

  const toggleFavorite = async (albumId: string) => {
    const albumToUpdate = albums.find(album => album._id === albumId);
    if (!albumToUpdate || !userId) return;
  
    const updatedFields = {
      isFavorite: !albumToUpdate.isFavorite
    };
  
    try {
      const response = await fetch('http://localhost:5500/api/editalbum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          albumId,
          userId,
          updatedFields,
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // Update local state only if DB update succeeded
        setAlbums(albums.map(album =>
          album._id === albumId
            ? { ...album, isFavorite: updatedFields.isFavorite }
            : album
        ));
      } else {
        console.error('Failed to toggle favorite:', result.error);
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  const updateAlbum = async (updatedAlbum: Album) => {
    if (!userId) return;

    try {
      const response = await fetch('http://localhost:5500/api/editalbum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          albumId: updatedAlbum._id,
          userId: userId,
          updatedFields: {
            title: updatedAlbum.title,
            artist: updatedAlbum.artist,
            year: updatedAlbum.year,
            favoriteTrack: updatedAlbum.favoriteTrack,
            rating: updatedAlbum.rating,
            isFavorite: updatedAlbum.isFavorite,
            coverUrl: updatedAlbum.coverUrl
          },
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setAlbums(albums.map(album =>
          album._id === updatedAlbum._id ? updatedAlbum : album
        ));
      } else {
        console.error('Failed to update album:', result.error);
      }
    } catch (err) {
      console.error('Error updating album:', err);
    }
  };

  const deleteAlbum = async (albumId: string) => {
    try {
      const response = await fetch('http://localhost:5500/api/deletealbum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ albumId }),
      });
  
      const result = await response.json();
  
      if (response.ok && result.error === 'Album deleted') {
        setAlbums(prev => prev.filter(album => album._id !== albumId));
      } else {
        console.error('Failed to delete album:', result.error);
      }
    } catch (err) {
      console.error('Error deleting album:', err);
    }
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
