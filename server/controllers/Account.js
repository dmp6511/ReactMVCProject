// controller for account
const models = require('../models');

const { Account } = models;

const loginPage = (req, res) => res.render('login');
const profilePage = (req, res) => res.render('profile');

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


    return res.json({ message: 'Login successful', redirect: '/profile' });
  });
};

// signup function
const signup = async (req, res) => {
  const firstname = `${req.body.firstname}`;
  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;
  const password2 = `${req.body.pass2}`;

  // check if all fields are filled out
  if (!firstname || !username || !password || !password2) {
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
    const newAccount = new Account({ firstname, username, password: hash });
    await newAccount.save(); // save the account
    req.session.account = Account.toAPI(newAccount); // set the user's session
    return res.json({ redirect: '/profile' });
  } catch (err) {
    // in case of the username already existing
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username already in use.' });
    }
    // otherwise return a 500
    return res.status(500).json({ error: 'An error occurred.' });
  }
};

// profile function
const getProfile = (req, res) => {
  // get the user's profile
  const account = Account.toAPI(req.session.account);
  console.log("user account", account);
  return res.json({ account });
};

// change password function
const changePass = async (req, res) => {
  const currentPass = `${req.body.currentPass}`;
  const newPass = `${req.body.newPass}`;
  const newPass2 = `${req.body.newPass2}`;

  // check if all fields are filled out
  if (!currentPass || !newPass || !newPass2) {
    return res.status(400).json({ error: 'Some fields are empty!' });
  }

  // check if the new passwords match
  if (newPass !== newPass2) {
    return res.status(400).json({ error: 'New passwords do not match!' });
  }

  // authenticate the user
  return Account.authenticate(req.session.account.username, currentPass, async (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong password!' });
    }

    // hash the new password
    const hash = await Account.generateHash(newPass);

    // update the user's password
    await Account.updateOne({ _id: req.session.account._id }, { password: hash });

    return res.json({ message: "Your password has been updated", redirect: '/profile' });
  });

};

// upgrade function
const upgrade = async (req, res) => {
  // get the card information from the user
  const cardName = `${req.body.cardName}`;
  const cardNumber = `${req.body.cardNumber}`;
  const expirationDate = `${req.body.expirationDate}`;
  const cvv = `${req.body.cvv}`;

  // check if all fields are filled out
  if (!cardName || !cardNumber || !expirationDate || !cvv) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  // check if the card number is valid
  if (cardNumber.length !== 16) {
    return res.status(400).json({ error: 'Invalid card number!' });
  }

  // authenticate the user and update their account to premium status
  await Account.updateOne({ _id: req.session.account._id }, { isPremium: true });
 

  // return a success message
  return res.json({ message: 'Payment successful! You are now a premium user!', redirect: '/profile' });
};

// exports
module.exports = {
  loginPage,
  logout,
  login,
  signup,
  profilePage,
  getProfile,
  changePass,
  upgrade,
};
