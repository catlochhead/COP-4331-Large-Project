import React, { useState } from 'react';
import '../styles/App.css';
import Navbar from '../components/Navbar';
import AlbumGrid from '../components/AlbumGrid';
import Sidebar from '../components/Sidebar';
import { Album } from '../types/Album';

// Define the Album interface


function App() {
  // Example albums data with Wikipedia cover images
  const [albums, setAlbums] = useState<Album[]>([
    {
      id: 1,
      title: "Dark Side of the Moon",
      artist: "Pink Floyd",
      year: "1973",
      favoriteTrack: "Time",
      rating: 9,
      isFavorite: true,
      coverUrl: "https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png"
    },
    {
      id: 2,
      title: "Random Access Memories",
      artist: "Daft Punk",
      year: "2013",
      favoriteTrack: "Get Lucky",
      rating: 8,
      isFavorite: false,
      coverUrl: "https://cdn-images.dzcdn.net/images/cover/311bba0fc112d15f72c8b5a65f0456c1/1900x1900-000000-80-0-0.jpg"
    },
    {
      id: 3,
      title: "Abbey Road",
      artist: "The Beatles",
      year: "1969",
      favoriteTrack: "Here Comes The Sun",
      rating: 10,
      isFavorite: false,
      coverUrl: "https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg"
    },
    {
      id: 4,
      title: "To Pimp a Butterfly",
      artist: "Kendrick Lamar",
      year: "2015",
      favoriteTrack: "Alright",
      rating: 9,
      isFavorite: true,
      coverUrl: "https://upload.wikimedia.org/wikipedia/en/f/f6/Kendrick_Lamar_-_To_Pimp_a_Butterfly.png"
    },
    {
      id: 5,
      title: "Blue",
      artist: "Joni Mitchell",
      year: "1971",
      favoriteTrack: "River",
      rating: 9,
      isFavorite: false,
      coverUrl: "https://upload.wikimedia.org/wikipedia/en/e/e1/Bluealbumcover.jpg"
    },
    {
      id: 6,
      title: "Rumours",
      artist: "Fleetwood Mac",
      year: "1977",
      favoriteTrack: "The Chain",
      rating: 9,
      isFavorite: true,
      coverUrl: "https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG"
    }
  ]);
  
  // Toggle favorite status for an album
  const toggleFavorite = (albumId: number) => {
    setAlbums(albums.map(album => 
      album.id === albumId ? { ...album, isFavorite: !album.isFavorite } : album
    ));
  };
  
  // Update album details
  const updateAlbum = (updatedAlbum: Album) => {
    setAlbums(albums.map(album => 
      album.id === updatedAlbum.id ? updatedAlbum : album
    ));
  };
  
  // Delete an album
  const deleteAlbum = (albumId: number) => {
    setAlbums(albums.filter(album => album.id !== albumId));
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="content-container">
        <Navbar />
        <div className="main-content">
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