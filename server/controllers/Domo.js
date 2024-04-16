// controller for the domo page
const models = require('../models');

const { Domo } = models;

const makerPage = async (req, res) => {
  return res.render('app');
};

// makeDomo function
const makeDomo = async (req, res) => {
  // check if all fields are filled out
  if (!req.body.name || !req.body.age || !req.body.height || !req.body.weight) {
    return res.status(400).json({ error: 'Hey! All fields are required' });
  }

  const domoData = {
    name: req.body.name,
    age: req.body.age,
    height: req.body.height,
    weight: req.body.weight,
    owner: req.session.account._id,
  };

  try {
    const newDomo = new Domo(domoData);
    await newDomo.save();
    return res.status(201).json({ name: newDomo.name, age: newDomo.age, height: newDomo.height, weight: newDomo.weight});


  } catch (err) {
    console.log(err);
    // if the domo already exists
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Domo already exists' });
    }

    return res.status(500).json({ error: 'An error occurred making the domo!' });
  }
};

// get Domos function
const getDomos = async (req, res) => {

  try {
    const query = { owner: req.session.account._id };
    const docs = await Domo.find(query).select('name age height weight').lean().exec();

    return res.json({ domos: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'An error occurred getting the domos' });
  }
}

// exports
module.exports = {
  makerPage,
  makeDomo,
  getDomos,
};
