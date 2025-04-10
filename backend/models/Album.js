// models/Album.js
const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  coverUrl: {
    type: String,
    default: '',
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  favoriteTrack: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true 
  }
});

module.exports = mongoose.model('Album', albumSchema);
