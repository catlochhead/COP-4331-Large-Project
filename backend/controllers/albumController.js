const Album = require('../models/Album');
const mongoose = require('mongoose');

const createAlbum = async (req, res) => {
  try {
    const {
      title,
      artist,
      year,
      coverUrl,
      favorite,
      favoriteTrack,
      rating
    } = req.body;

    const newAlbum = new Album({
      title,
      artist,
      year,
      coverUrl,
      favorite,
      favoriteTrack,
      rating,
      user: req.userId
    });

    const savedAlbum = await newAlbum.save();
    res.status(201).json(savedAlbum);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create album' });
  }
};

const searchAlbums = async (req, res) => {
  try {
    const { q = '' } = req.query;

    // Start with filtering by user
    let query = {
      user: req.userId, // Filter by logged-in user
    };

    // Check if the query is a valid ObjectId (for searching by _id)
    if (mongoose.Types.ObjectId.isValid(q)) {
      query._id = mongoose.Types.ObjectId(q); // Search by _id if the query is a valid ObjectId
    } else {
      // If it's not a valid ObjectId, use the regular text search on other fields
      const regex = new RegExp(q, 'i');
      query.$or = [
        { title: regex },
        { artist: regex },
        { favoriteTrack: regex }
      ];
    }
    // Find albums based on the query
    const results = await Album.find(query);
    res.status(200).json(results);

  } catch (err) {
    console.error('Search failed:', err);
    res.status(500).json({ message: 'Search failed' });
  }
};



module.exports = { createAlbum, searchAlbums };
