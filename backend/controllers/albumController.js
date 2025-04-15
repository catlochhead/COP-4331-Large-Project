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
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    let query = {
      user: userId,
    };

    if (mongoose.Types.ObjectId.isValid(q)) {
      query._id = mongoose.Types.ObjectId(q);
    } else {
      const regex = new RegExp(q, 'i');
      query.$or = [
        { title: regex },
        { artist: regex },
        { favoriteTrack: regex }
      ];
    }

    const results = await Album.find(query);
    res.status(200).json(results);
  } catch (err) {
    console.error('Search failed:', err);
    res.status(500).json({ message: 'Search failed' });
  }
};


module.exports = {
  createAlbum,
  searchAlbums
};
