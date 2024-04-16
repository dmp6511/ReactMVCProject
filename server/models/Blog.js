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
});

blogModel = mongoose.model('Blog', blogSchema);
module.exports = blogModel;

