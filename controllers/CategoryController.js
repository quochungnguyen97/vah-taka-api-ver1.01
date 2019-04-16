const User = require('../models/User');
const Category = require('../models/Category').Category;
const bcrypt = require('bcrypt');

// get all
// role everyone
const getAll = (req, res, next) => {
  Category.find({}).then(categories => {
    if (categories) {
      res.send(categories);
    } else res.status(400).send();
  }).catch(next);
}

// get by id
// role everyone
const getById = (req, res, next) => {
  Category.findOne({
    ID: req.params.id
  }).then(category => {
    if (category) {
      res.send(category);
    } else res.status(400).send();
  }).catch(next);
}

// insert
// role admin
const insert = (req, res, next) => {
  const {username, password} = req.body.user;
  const category = req.body.category;

  User.findOne({
    username
  }).then(user => {
    if (user) {
      if (bcrypt.compareSync(password, user.password) && user.role === "Ad") {
        Category.create(category).then(cat => {
          if (cat) res.send(cat);
          else res.status(402).send();
        }).catch(next);
      } else res.status(401).send();
    } else res.status(400).send();
  }).catch(next);
}

module.exports = {
  getAll,
  getById,
  insert
}
