import React, { useState } from 'react';
import '../styles/App.css';
import AddAlbumForm from '../components/AddAlbumForm';  // Import the AddAlbumForm component
import { Album } from '../types/Album';
import Navbar from '../components/Navbar';

const CreateAlbumPage: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);  // Store albums
  const [message, setMessage] = useState('');  // State to hold success/error message

  // Handle adding an album and making the API call
  const handleAddAlbum = async (album: Omit<Album, 'id'>) => {
    try {
      const response = await fetch('http://localhost:5500/api/albums', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(album),
        credentials: 'include',  // Ensure cookies (JWT token) are included in the request
      });
  
      if (response.ok) {
        const newAlbum = await response.json();
        setAlbums([...albums, newAlbum]); // Update state with new album
        console.log('Album Created:', newAlbum);
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.message || 'Failed to add album');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  

  return (
    <div className="create-album-page">
      {/* Navbar component (if you have it for navigation) */}
      <Navbar />

      {/* AddAlbumForm component to handle the album creation */}
      <AddAlbumForm onAddAlbum={handleAddAlbum} />
      
      {/* Show the success or error message */}
      {message && <p className="status-message">{message}</p>}
    </div>
  );
};

export default CreateAlbumPage;
