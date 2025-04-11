import React, { useState } from 'react';
import { Album } from '../types/Album';

const CreateAlbumPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [year, setYear] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [favoriteTrack, setFavoriteTrack] = useState('');
  const [rating, setRating] = useState(Number);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAlbum: Album = {
      id: 1,
      title,
      artist,
      year,
      coverUrl,
      isFavorite: false,
      favoriteTrack,
      rating,
    };
    console.log('Album Created:', newAlbum);

    // Reset form

    setTitle('');
    setArtist('');
    setYear('');
    setCoverUrl('');
    setFavorite(false);
    setFavoriteTrack('');
    setRating(Number);
  };

  return (
    <form onSubmit={handleSubmit}>
    <h2>Create Album</h2>

    <label> Title: </label>
    <p><input value={title} onChange={e => setTitle(e.target.value)} placeholder="Album Title" /></p>

    <label> Artist: </label>
    <p><input value={artist} onChange={e => setArtist(e.target.value)} placeholder="Artist" /></p>

    <label> Year: </label>
    <p><input value={year} onChange={e => setYear(e.target.value)} placeholder="Year" /></p>

    <label> URL for Cover Picture: </label>
    <p><input value={coverUrl} onChange={e => setCoverUrl(e.target.value)} placeholder="Cover Picture Url" /></p>

    <p><label>Is this a favorite album? </label>
    <input type="checkbox" checked={favorite} onChange={e => setFavorite(e.target.checked)} /></p>

    <label>Favorite Track:</label>
    <p><input value={favoriteTrack} onChange={e => setFavoriteTrack(e.target.value)} placeholder="Favorite Track" /></p>

    <label>Rating:</label>
    <p><input value={rating} onChange={e => setRating(Number)} placeholder="Rating Out of 10" /></p>

    <button type="submit">Create</button>
    </form>
  );
};

export default CreateAlbumPage;
