import React, { useState } from 'react';
import '../styles/App.css';
import AddAlbumForm from '../components/AddAlbumForm';  // Import the AddAlbumForm component
import { Album } from '../types/Album';
import Navbar from '../components/Navbar';

const CreateAlbumPage: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);  // Store albums
  
  // Handle adding an album
  const handleAddAlbum = (album: Omit<Album, 'id'>) => {
    const newAlbum = { ...album, id: albums.length + 1 }; // Generate new ID
    setAlbums([...albums, newAlbum]);
    console.log('Album Created:', newAlbum);
  };

  return (
    <div className="create-album-page">
      {/* AddAlbumForm component to handle the album creation */}
      <AddAlbumForm onAddAlbum={handleAddAlbum} />
    </div>
  );
};

export default CreateAlbumPage;