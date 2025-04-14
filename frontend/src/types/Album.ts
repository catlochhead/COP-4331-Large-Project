export interface Album {
  _id: string;
  title: string;
  artist: string;
  year: string;
  favoriteTrack: string;
  rating: number;
  isFavorite: boolean;
  coverUrl: string;
}