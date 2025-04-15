import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import AlbumGrid from '../components/AlbumGrid';
import { Album } from '../types/Album';

function FavoritesPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user ID
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res = await fetch('http://localhost:5500/api/current_user', {
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Failed to fetch user');
        const data = await res.json();
        setUserId(data.userId);
      } catch (err) {
        console.error('Error fetching user ID:', err);
      }
    };

    fetchUserId();
  }, []);

  // ✅ Fetch all albums using existing working route
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('http://localhost:5500/api/albums/search', {
          credentials: 'include',
        });

        if (!response.ok) throw new Error('Failed to fetch albums');
        const data: Album[] = await response.json();
        setAlbums(data);
      } catch (err) {
        console.error('Error fetching albums:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  const favoriteAlbums = albums.filter(album => album.favorite);

  const toggleFavorite = (albumId: string) => {
    setAlbums(prev =>
      prev.map(album =>
        album._id === albumId ? { ...album, favorite: !album.favorite } : album
      )
    );
  };

  const deleteAlbum = (albumId: string) => {
    setAlbums(prev => prev.filter(album => album._id !== albumId));
  };

  const updateAlbum = (updatedAlbum: Album) => {
    setAlbums(prev =>
      prev.map(album =>
        album._id === updatedAlbum._id ? updatedAlbum : album
      )
    );
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="content-container">
        <Navbar />
        <div className="main-content">
          {loading ? (
            <p>Loading favorites...</p>
          ) : favoriteAlbums.length === 0 ? (
            <p>No favorite albums yet. Mark some as favorites!</p>
          ) : (
            <AlbumGrid
              albums={favoriteAlbums}
              toggleFavorite={toggleFavorite}
              updateAlbum={updateAlbum}
              deleteAlbum={deleteAlbum}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default FavoritesPage;