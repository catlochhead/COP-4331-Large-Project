import React, { useState } from 'react';
import { Album } from '../types/Album';

interface AddAlbumFormProps {
  onAddAlbum: (album: Omit<Album, 'id'>) => void;
}

const AddAlbumForm: React.FC<AddAlbumFormProps> = ({ onAddAlbum }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [year, setYear] = useState('');
  const [favoriteTrack, setFavoriteTrack] = useState('');
  const [rating, setRating] = useState<number>(8);
  const [coverUrl, setCoverUrl] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAlbum = {
      title,
      artist,
      year,
      favoriteTrack,
      rating,
      isFavorite: false,
      coverUrl
    };
    
    onAddAlbum(newAlbum);
    
    // Reset form
    setTitle('');
    setArtist('');
    setYear('');
    setFavoriteTrack('');
    setRating(8);
    setCoverUrl('');
    setShowForm(false);
  };

  return (
    <div className="add-album-container">
      {!showForm ? (
        <button 
          className="add-album-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Album
        </button>
      ) : (
        <form className="add-album-form" onSubmit={handleSubmit}>
          <h2>Add New Album</h2>
          
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="artist">Artist:</label>
            <input
              type="text"
              id="artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="year">Year:</label>
            <input
              type="text"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="favoriteTrack">Favorite Track:</label>
            <input
              type="text"
              id="favoriteTrack"
              value={favoriteTrack}
              onChange={(e) => setFavoriteTrack(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="rating">Rating (1-10):</label>
            <input
              type="number"
              id="rating"
              min="1"
              max="10"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="coverUrl">Album Cover URL:</label>
            <input
              type="url"
              id="coverUrl"
              placeholder="https://example.com/album-cover.jpg"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
            />
            <small>Enter a URL to an image of the album cover</small>
          </div>
          
          <div className="form-buttons">
            <button type="submit" className="submit-btn">Add Album</button>
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddAlbumForm;