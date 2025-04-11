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
  const [rating, setRating] = useState<number | null>(null);
  const [coverUrl, setCoverUrl] = useState('');
  const [isImageValid, setIsImageValid] = useState(false);
  const [albumAdded, setAlbumAdded] = useState(false); // New state to track album added

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newAlbum = {
      title,
      artist,
      year,
      favoriteTrack,
      rating: rating ?? 1,
      isFavorite: false,
      coverUrl,
    };

    onAddAlbum(newAlbum);

    // Set albumAdded to true after adding the album
    setAlbumAdded(true);

    // Reset form
    setTitle('');
    setArtist('');
    setYear('');
    setFavoriteTrack('');
    setRating(null);
    setCoverUrl('');
    setIsImageValid(false);

    // Optional: Hide the success message after a certain time
    setTimeout(() => setAlbumAdded(false), 3000); // Hide after 3 seconds
  };

  const handleCancel = () => {
    setTitle('');
    setArtist('');
    setYear('');
    setFavoriteTrack('');
    setRating(null);
    setCoverUrl('');
    setIsImageValid(false);
    setAlbumAdded(false); // Reset success message on cancel
  };

  return (
    <div className="add-album-container">
      <div className="add-album-header">
        <h2>Add New Album</h2>
      </div>
      <form className="add-album-form" onSubmit={handleSubmit}>
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
            value={rating ?? ''}
            onChange={(e) => setRating(e.target.value ? parseInt(e.target.value) : null)}
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
            onChange={(e) => {
              setCoverUrl(e.target.value);
              setIsImageValid(false); // Reset validity when typing
            }}
          />
          <small>Enter a URL to an image of the album cover</small>

          {coverUrl && (
            <>
              {!isImageValid && (
                <p style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
                  Invalid URL
                </p>
              )}

              {/* Album Cover Preview text above the image */}
              {isImageValid && (
                <p style={{ marginTop: "5px", textAlign: "center" }}>
                  Album Cover Preview:
                </p>
              )}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '10px',
                }}
              >
                <img
                  src={coverUrl}
                  alt="Album Cover Preview"
                  style={{
                    display: isImageValid ? 'block' : 'none',
                    width: '250px',
                    aspectRatio: '1 / 1',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    backgroundColor: '#1a1a1a',
                  }}
                  onLoad={() => setIsImageValid(true)}
                  onError={() => setIsImageValid(false)}
                />
              </div>
            </>
          )}
        </div>

        <div className="form-buttons">
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Clear
          </button>
          <button type="submit" className="submit-btn">
            Add Album
          </button>
        </div>
      </form>

      {/* Display success message below buttons if album is added */}
      {albumAdded && (
        <p
          style={{
            color: 'green',
            fontSize: '16px',
            textAlign: 'center',
            marginTop: '10px',
          }}
        >
          Album Added Successfully
        </p>
      )}
    </div>
  );
};

export default AddAlbumForm;
