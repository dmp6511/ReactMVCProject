// calling in all the necessary libraries
require('dotenv').config();

const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const helmet = require('helmet');
const session = require('express-session');
const RedeisStore = require('connect-redis').default;
const redis = require('redis');

const fileUpload = require('express-fileupload');

const router = require('./router.js');

// port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// connecting to the database
const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/MVCProject2';
mongoose.connect(dbURI).catch((err) => {
  if (err) {
    console.log('Could not connect to database');
    throw err;
  }
});

// setting up redis
const redisClient = redis.createClient({
  url: process.env.REDISCLOUD_URL,
});

redisClient.on('error', (err) => {
  console.log('Redis Client Error:', err);
});

redisClient.connect().then(() => {
  // setting up express
  const app = express();

  app.use(helmet());
  app.use(fileUpload());
  app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted/`)));
  app.use(favicon(`${__dirname}/../hosted/img/favicon.png`));
  app.use(compression());
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(bodyParser.json());

  app.use(session({
    key: 'sessionid',
    store: new RedeisStore({
      client: redisClient,
    }),
    secret: 'Project2SecretString',
    resave: false,
    saveUninitialized: false,
  }));

  app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: '',
  }));

  app.set('view engine', 'handlebars');
  app.set('views', `${__dirname}/../views`);

  // start the server
  router(app);
  app.listen(port, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Listening on port ${port}`);
  });
});
