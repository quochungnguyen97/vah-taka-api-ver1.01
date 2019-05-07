const Item = require('../models/Item').Item;
const User = require('../models/User');
const Order = require('../models/Order');
const Category = require('../models/Category').Category;
const bcrypt = require('bcrypt');

// get best selling
// role: everyone
const bestSelling = (req, res, next) => {
  const {num} = req.params;
  Order.find({}).then(orders => {
    let listItems = [];
    orders = orders.filter(order => order.status !== "CART");

    orders.forEach(order => {
      order.items.forEach(item => {
        // console.log(item._id);
        let check = false;
        // console.log(listItems);
        if (listItems.length != 0){
          listItems = listItems.map(it => {
            console.log(it._id, item._id);
            if (it._id === item._id) {
              console.log("equal");
              it.number += item.number;
              check = true;
            }
            console.log("pass");
            return it;
          })
        }

        if (!check) {
          listItems.push(item);
        }
        // console.log(listItems);
      })
    });
    
    const n = listItems.length < num ? listItems.length : num;
    console.log(n);

    listItems.sort((a, b) => b.number - a.number);

    let sendItems = [];

    for (let i = 0; i < n; i++) sendItems.push(listItems[i]);

    res.send(sendItems);
  }).catch(next);
} 

// get categories
const getCategories = (req, res, next) => {
  Category.find({}).then(categories => {
    if (categories) res.send(categories);
    else res.status(400).send();
  }).catch(next);
}

// new items
// role: everyone
const newItems = (req, res, next) => {
  const {num} = req.params;
  Item.find({}).then(items => {
    if (items) {
      let sendItems = [];
      const n = items.length < num ? listItems.length : num;

      for (let i = 0; i < n; i++) {
        sendItems.push(items[items.length - 1 - i]);
      }

      res.send(sendItems);
    } else res.status(400).send();
  }).catch(next);
}

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
  console.log(req.params.kw);
  Item.find({
    name: {
      $regex: req.params.kw,
      $options: 'i'
    }
  }).then(items => {
    console.log(items.length);
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
  bestSelling,
  getByType,
  newItems,
  getCategories
};

module.exports = itemController;
