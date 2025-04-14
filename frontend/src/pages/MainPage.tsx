import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import Navbar from '../components/Navbar';
import AlbumGrid from '../components/AlbumGrid';
import Sidebar from '../components/Sidebar';
import { Album } from '../types/Album';

function App() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const params = new URLSearchParams();
        params.append('', searchQuery);
    
        const response = await fetch(`http://localhost:5500/api/albums/search?${params.toString()}`, {
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleFavorite = (albumId: number) => {
    setAlbums(albums.map(album => 
      album.id === albumId ? { ...album, isFavorite: !album.isFavorite } : album
    ));
  };

  const updateAlbum = (updatedAlbum: Album) => {
    setAlbums(albums.map(album => 
      album.id === updatedAlbum.id ? updatedAlbum : album
    ));
  };

  const deleteAlbum = (albumId: number) => {
    setAlbums(albums.filter(album => album.id !== albumId));
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
            placeholder="Search albums..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-bar"
          />

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
