// blog controller
const models = require('../models');

const { Blog } = models;

// render the blog page
const blogPage = async (req, res) => res.render('app');

// get all blogs
const getBlogs = async (req, res) => {
  // try catch
  try {
    const query = { owner: req.session.account._id };
    const docs = await Blog.BlogModel.find(query).select('title artist genre rating description createdAt').lean().exec();
    return res.json({ blogs: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'An error occurred' });
  }
};

// create a blog

// exports
module.exports = {
  blogPage,
  getBlogs,
};
