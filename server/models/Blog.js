// model for the song blog
const mongoose = require('mongoose');

let blogModel = {};

// blog schema
// accepts title, artist, genre and a rating. Users can also add comments to the blog
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  artist: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    max: 5,
    required: true,
  },

  // description (optional)
  description: {
    type: String,
    required: false,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
});

// converts a doc to something we can store in redis later on
blogSchema.statics.toAPI = (doc) => ({
  title: doc.title,
  artist: doc.artist,
  genre: doc.genre,
  rating: doc.rating,
  description: doc.description,
  createdAt: doc.createdAt,
});

blogModel = mongoose.model('Blog', blogSchema);
module.exports = blogModel;
