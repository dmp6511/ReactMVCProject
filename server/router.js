const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getBlogs', mid.requiresLogin, controllers.Blog.getBlogs);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/profile', mid.requiresLogin, controllers.Account.profilePage);

  app.get('/blog', mid.requiresLogin, controllers.Blog.blogPage);
  app.post('/blog', mid.requiresLogin, controllers.Blog.createBlog);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
