const express = require('express');
const router = express.Router();
const { createAlbum, searchAlbums } = require('../controllers/albumController');

// POST /api/songs
router.post('/', createAlbum);
router.get('/search', searchAlbums);
module.exports = router;
