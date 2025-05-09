import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage';
import FavoritesPage from './pages/FavoritesPage';
import CreateAlbumPage from './pages/CreateAlbumPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route now redirects to login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/create" element={<CreateAlbumPage />} />
      </Routes>
    </Router>
  );
}

export default App;
