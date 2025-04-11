import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import FavoritesPage from './pages/FavoritesPage';
import CreateAlbumPage from './pages/CreateAlbumPage';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="content-container">
        <div className="main-content">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/create" element={<CreateAlbumPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;

