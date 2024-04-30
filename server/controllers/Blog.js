// blog controller
const models = require('../models');

const { Blog } = models;

// render the blog page
const blogPage = async (req, res) => res.render('blog');

// create a blog
const createBlog = async (req, res) => {
  // check if all fields are filled out
  if (!req.body.title || !req.body.artist || !req.body.genre || !req.body.rating) {
    return res.status(400).json({ error: 'One or more fields are empty!' });
  }

  // check if the rating is a number and between 0 and 5
  if (Number.isNaN(req.body.rating) && req.body.rating < 0 && req.body.rating > 5) {
    return res.status(400).json({ error: 'Rating must be a number between 1-5!' });
  }

  // create a new blog
  const blogData = {
    title: req.body.title,
    artist: req.body.artist,
    genre: req.body.genre,
    rating: req.body.rating,
    description: req.body.description,
    owner: req.session.account._id,
    username: req.session.account.username,
  };

  try {
    const newBlog = new Blog(blogData);
    await newBlog.save();

    // log it out
    console.log(newBlog);

    return res.status(201).json({
      title: newBlog.title,
      artist: newBlog.artist,
      genre: newBlog.genre,
      rating: newBlog.rating,
      description: newBlog.description,
      createdAt: newBlog.createdAt,
      owner: newBlog.owner,
      username: newBlog.username,
    });
  } catch (err) {
    return res.status(500).json({ error: 'An error occurred making your blog' });
  }
};

// get blogs for the user only
const getBlogs = async (req, res) => {
  // try catch
  try {
    const query = { owner: req.session.account._id };
    const docs = await Blog.find(query).select(' ');
    return res.json({ blogs: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'An error occurred' });
  }
};

// get all blogs
const getAllBlogs = async (req, res) => {
  // try catch
  try {
    const docs = await Blog.find().select(' ');
    return res.json({ blogs: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'An error occurred' });
  }
};

// exports
module.exports = {
  blogPage,
  createBlog,
  getBlogs,
  getAllBlogs,
};
