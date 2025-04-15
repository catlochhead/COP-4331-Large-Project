const express = require('express');
const router = express.Router();
const {
  createAlbum,
  searchAlbums,
  getFavorites
} = require('../controllers/albumController');

// POST /api/Albums/
router.post('/', createAlbum);

// GET /api/Albums/search
router.get('/search', searchAlbums);

module.exports = router;