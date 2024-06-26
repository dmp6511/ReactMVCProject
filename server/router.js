const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getBlogs', mid.requiresLogin, controllers.Blog.getBlogs);
  app.get('/getAllBlogs', mid.requiresLogin, controllers.Blog.getAllBlogs);
  app.get('/getProfile', mid.requiresLogin, controllers.Account.getProfile);

  app.get('/home', mid.requiresLogin, controllers.Home.homePage);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.post('/changePass', mid.requiresLogin, controllers.Account.changePass);

  app.post('/getFavorites', mid.requiresLogin, controllers.Account.favorite);
  app.post('/upload', mid.requiresLogin, controllers.Account.updateProfilePic);

  app.post('/upgrade', mid.requiresLogin, controllers.Account.upgrade);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/profile', mid.requiresLogin, controllers.Account.profilePage);

  app.get('/blog', mid.requiresLogin, controllers.Blog.blogPage);
  app.post('/blog', mid.requiresLogin, controllers.Blog.createBlog);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);

  // 404
  app.get('/*', mid.requiresSecure, mid.requiresLogout, controllers.Account.notFound);
};

module.exports = router;
