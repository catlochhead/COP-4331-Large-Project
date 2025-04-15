import React from 'react';
import { Album } from '../types/Album';

interface AlbumCardProps {
  album: Album;
  toggleFavorite: (albumId: string) => void; // Fix: now takes albumId
  onEdit?: () => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album, toggleFavorite, onEdit }) => {
  console.log("Rendering AlbumCard with ID:", album._id);
  const { _id, title, artist, year, favoriteTrack, rating, isFavorite, coverUrl } = album;

  // Handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/default-album-cover.png'; // Fallback to default image
  };

  return (
    <div className="album-card">
      <div className="album-cover">
        {coverUrl ? (
          <img 
            src={coverUrl} 
            alt={`${title} by ${artist}`} 
            className="album-image"
            onError={handleImageError}
          />
        ) : (
          <div className="album-placeholder">Album Cover</div>
        )}

        {/* Favorite button */}
        <button 
          className={`favorite-btn ${isFavorite ? 'is-favorite' : 'not-favorite'}`}
          onClick={() => toggleFavorite(_id)} // ✅ Pass the album ID
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <span>★</span>
        </button>

        {/* Edit button */}
        <button 
          className="edit-btn"
          onClick={onEdit}
          aria-label="Edit album"
        >
          <span>✏️</span>
        </button>
      </div>

      <div className="album-info">
        <div className="title">
          <span>Title:</span> {title}
        </div>
        <div className="artist">
          <span>Artist:</span> {artist}
        </div>
        <div className="year">
          <span>Year:</span> {year}
        </div>
        <div className="favorite-track">
          <span>Favorite track:</span> {favoriteTrack}
        </div>
        <div className="rating">
          <span>Rating:</span> {rating}/10
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
