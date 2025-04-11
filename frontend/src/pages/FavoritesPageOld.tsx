import React, { useEffect, useState } from 'react';
import { Album } from '../types/Album';

const FavoritesPage: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    // Simulated data
    const allAlbums: Album[] = [
      { id: 1, title: '1989', artist: 'Taylor Swift', year: "2014", coverUrl: "https://store.taylorswift.com/cdn/shop/files/1mjQym0yi2krxJWjFtvkNx0fXwYrHhkH.png?v=1691644764", isFavorite: true, favoriteTrack: "Blank Space", rating:1},
      { id: 2, title: '1988', artist: 'Taylor S', year: "2020", coverUrl: "www.wikipedia.com", isFavorite: true, favoriteTrack: "song", rating:10},
    ];
    setAlbums(allAlbums.filter(a => a.isFavorite));
  }, []);

  return (
    <div>
      <h2>Favorite Albums</h2>
      <ul>
      {albums.map(album => (
        <li key={album.id}>
          <h3>{album.title} by {album.artist}</h3>
          <p>Created in {album.year}</p>
          <p>Favorite song: {album.favoriteTrack}</p>
          <p>Rating: {album.rating}</p>
          
          {/* Display the album cover image as a square */}
          <img
            src={album.coverUrl}
            alt={`${album.title} album cover`}
            style={{
              width: '200px',    // Set width
              height: '200px',   // Set height to make it square
              objectFit: 'cover' // Ensures the image fills the area without distortion
            }}
          />
        </li>
      ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;