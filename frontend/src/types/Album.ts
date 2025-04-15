export interface Album {
  _id: string; // Change this to 'string' instead of 'number'
  title: string;
  artist: string;
  year: string;
  favoriteTrack: string;
  rating: number;
  isFavorite: boolean;
  coverUrl: string;
}
