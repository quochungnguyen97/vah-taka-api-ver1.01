const Item = require('../models/Item').Item;
const User = require('../models/User');
const bcrypt = require('bcrypt');


// get all items controller
// role: everyone
const getAll = (req, res, next) => {
  Item.find({}).then(items => {
    res.send(items);
  }).catch(next);
}

// search item controller
// role: everyone
const search = (req, res, next) => {
  Item.find({
    name: {
      $regex: req.params.kw,
      $options: 'i'
    }
  }).then(items => {
    if (items) res.send(items);
    else res.status(400).send();
  }).catch(next);
}

// get an item controller
// role: everyone
const getById = (req, res, next) => {
  //console.log('rc request');
  Item.findById({_id: req.params.id}).then(item => {
    if (item) res.send(item);
    else res.status(400).send();
  }).catch(next);
}

// get items by category
// role: everyone
const getByType = (req, res, next) => {
  Item.find({category: req.params.type}).then(items => {
    if (items) res.send(items);
    else res.status(400).send();
  }).catch(next);
}

// insert item controller
// role: Ad
const insert = (req, res, next) => {
  const user = req.body.user;
  const item = req.body.item;
  
  User.findOne({
    username: user.username
  }).then(u => {
    if (u) {
      if (u.role === "Ad" && bcrypt.compareSync(user.password, u.password)) {
        Item.create(item).then(it => {
          if (it) res.send(it);
          else res.status(401).send();
        }).catch(next);
      } else res.status(400).send();
    } else res.status(400).send();
  }).catch(next);
}

// update item controller
// role: Ad
const update = (req, res, next) => {
  const {username, password} = req.body.user;
  const item = req.body.item;

  User.findOne({
    username
  }).then (u => {
    if (u) {
      if (u.role === "Ad" && bcrypt.compareSync(password, u.password)) {
        Item.findByIdAndUpdate({
          _id: req.params.id
        }, item).then(it => {
          if (it) res.send(it);
          else res.status(401).send();
        }).catch(next);
      } else res.status(401).send();
    } else res.status(400).send();    
  }).catch(next);
}

// delete item controller
// role: Ad
const _delete = (req, res, next) => {
  const {username, password} = req.body;

  User.findOne({
    username
  }).then(user => {
    if (user){
      if (user.role === "Ad" && bcrypt.compareSync(password, user.password)) {
        Item.findByIdAndRemove({
          _id: req.params.id
        }).then(item => {
          if (item) {
            res.send(item);
          } else res.status(400).send();
        }).catch(next);
      } else res.status(401).send();
    } else res.status(400).send();
  }).catch(next);
}

const itemController = {
  getAll,
  getById,
  insert, 
  search,
  update,
  _delete,
  getByType
};

module.exports = itemController;
