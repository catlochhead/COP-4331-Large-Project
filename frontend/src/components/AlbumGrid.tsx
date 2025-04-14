import React, { useState } from 'react';
import AlbumCard from './AlbumCard.tsx';
import { Album } from '../types/Album';
import EditAlbumModal from './EditAlbumModal'; // You'll need to create this component

interface AlbumGridProps {
  albums: Album[];
  toggleFavorite: (albumId: string) => void; // Update to accept string instead of number
  updateAlbum: (updatedAlbum: Album) => void;
  deleteAlbum: (albumId: string) => void; // Update to accept string instead of number
}

const AlbumGrid: React.FC<AlbumGridProps> = ({ 
  albums, 
  toggleFavorite, 
  updateAlbum, 
  deleteAlbum 
}) => {
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  
  const handleEdit = (album: Album) => {
    setEditingAlbum(album);
    setShowEditModal(true);
  };
  
  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingAlbum(null);
  };
  
  const handleSaveChanges = (updatedAlbum: Album) => {
    updateAlbum(updatedAlbum);
    handleCloseModal();
  };
  
  const handleDelete = (albumId: string) => {  // Change to string
    if (window.confirm('Are you sure you want to delete this album?')) {
      deleteAlbum(albumId);
      handleCloseModal();
    }
  };
  
  return (
    <>
      <div className="album-grid">
        {albums.length > 0 ? (
          albums.map(album => (
            <AlbumCard 
              key={album._id} 
              album={album} 
              toggleFavorite={() => toggleFavorite(album._id)}  // Ensure it's passing a string id
              onEdit={() => handleEdit(album)}
            />
          ))
        ) : (
          <div className="no-albums">
            No albums in your collection yet. Add your first album above!
          </div>
        )}
      </div>
      
      {/* Edit Modal */}
      {showEditModal && editingAlbum && (
        <EditAlbumModal
          album={editingAlbum}
          onClose={handleCloseModal}
          onSave={handleSaveChanges}
          onDelete={() => handleDelete(editingAlbum._id)}  // Ensure it's passing a string id
        />
      )}
    </>
  );
};

export default AlbumGrid;
