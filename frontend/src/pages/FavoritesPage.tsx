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

  const favoriteAlbums = albums.filter(album => album.isFavorite);

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