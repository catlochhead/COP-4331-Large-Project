// types/Album.ts
export interface Album {
    _id: string; // 👈 important to access MongoDB _id
    title: string;
    artist: string;
    year: number;
    favoriteTrack: string;
    rating: number;
    coverUrl?: string;
    favorite?: boolean;
    user?: string;
  }
  