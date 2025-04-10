import React, { useState } from 'react';
import AlbumCard from './AlbumCard';
import { Album } from '../types/Album';
import EditAlbumModal from './EditAlbumModal'; // You'll need to create this component

interface AlbumGridProps {
  albums: Album[];
  toggleFavorite: (albumId: number) => void;
  updateAlbum: (updatedAlbum: Album) => void;
  deleteAlbum: (albumId: number) => void;
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
  
  const handleDelete = (albumId: number) => {
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
              key={album.id} 
              album={album} 
              toggleFavorite={() => toggleFavorite(album.id)}
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
          onDelete={() => handleDelete(editingAlbum.id)}
        />
      )}
    </>
  );
};

export default AlbumGrid;