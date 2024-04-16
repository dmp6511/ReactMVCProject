// controller for account
const models = require('../models');

const { Account } = models;

const loginPage = (req, res) => res.render('login');

// logout function
const logout = (req, res) => {
  req.session.destroy();
  return res.redirect('/');
};

// login function
const login = (req, res) => {
  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  // check if all fields are filled out
  if (!username || !password) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  // authenticate the user
  return Account.authenticate(username, password, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password!' });
    }
    // set the user's session
    req.session.account = Account.toAPI(account);

    return res.json({ redirect: '/maker' });
  });
};

// signup function
const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;
  const password2 = `${req.body.pass2}`;

  // check if all fields are filled out
  if (!username || !password || !password2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  // check if passwords match
  if (password !== password2) {
    return res.status(400).json({ error: 'Passwords do not match!' });
  }

  // hash the password
  try {
    const hash = await Account.generateHash(password);

    // create a new account
    const newAccount = new Account({ username, password: hash });
    await newAccount.save(); // save the account
    req.session.account = Account.toAPI(newAccount); // set the user's session
    return res.json({ redirect: '/maker' });
  } catch (err) {
    // in case of the username already existing
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username already in use.' });
    }
    // otherwise return a 500
    return res.status(500).json({ error: 'An error occurred.' });
  }
};

// exports
module.exports = {
  loginPage,
  logout,
  login,
  signup,
};
