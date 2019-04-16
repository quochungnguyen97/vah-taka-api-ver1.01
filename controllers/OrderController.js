const User = require('../models/User');
const Order = require('../models/Order');
const Item = require('../models/Item');
const bcrypt = require('bcrypt');

// order controller
// role: own user
const order = (req, res, next) => {
  const {username, password} = req.body.user;
  const {orderId} = req.body;

  User.findOne({
    username
  }).then(user => {
    if (user) {

      if (bcrypt.compareSync(password, user.password)) {
        Order.findById(orderId).then(order => {
          if (order) {
            if (order.status === "CART") {
              order.status = "ORDERED";
              if (order.items.length === 0) {
                res.status(402).send();
              } else {
                order.save(err => {
                  if (err) res.status(402).send();
                  else {
                    Order.create({
                      ofUser: user._id
                    }).then(ord => {
                      if (ord) {
                        res.send(order);
                      } else res.status(402).send();
                    }).catch(next);
                  }
                });
              }   
            } else res.status(402).send();
          } else res.status(402).send();
        }).catch(next);

      } else res.status(401).send();

    } else res.status(400).send();
  }).catch(next);
}

// get all orders controller
// role: Ad
const getAll = (req, res, next) => {
  const {username, password} = req.body.user;
  
  User.findOne({username}).then(user => {
    
    if (user) {
      if (bcrypt.compareSync(password, user.password) && user.role == "Ad") {

        Order.find({}).then(orders => {
          if (orders) res.send(orders);
          else res.status(402).send();
        }).catch(next);

      } else res.status(401).send();
    } else res.status(400).send();

  }).catch(next);
}

// get orders of user
// role: own user, Ad
const getOrdersOfUser = (req, res, next) => {
  const userId = req.params.id;
  const {username, password} = req.body.user;

  User.findOne({
    username
  }).then(user => {
    if (user) {
      if (bcrypt.compareSync(password, user.password)){
        if (user.role === "Ad" || user._id.equals(userId)) {
          Order.find({ofUser: userId}).then(orders => {
            if (orders) {
              res.send(orders);
            } else res.status(402).send();
          }).catch(next);
        } else res.status(401).send();
      } else res.status(401).send();
    } else res.status(400).send();
  }).catch(next);
}

// get order by id controller
// role: own user, Ad
const get = (req, res, next) => {
  const {username, password} = req.body.user;

  User.findOne({username}).then(user => {

    if (user) {
      if (bcrypt.compareSync(password, user.password) ){
        Order.findById({_id: req.params.id}).then(order => {
          if (order) {
            if (user.role === "Ad" || user._id.equals(order.ofUser)){
              res.send(order);
            } else res.status(402).send();
            
          } else res.status(402).send();
        }).catch(next);
      } else res.status(401).send();
    } else res.status(400).send();

  }).catch(next);
}

// delete order
// role: Ad
const _delete = (req, res, next) => {
  const {username, password} = req.body.user;

  User.findOne({username}).then(user => {
    if (user) {
      if (bcrypt.compareSync(password, user.password) && user.role == "Ad" ) {

        Order.findByIdAndRemove({_id: req.params.id}).then(order => {
          if (order) {
            res.send(order);
          } else res.status(402).send();
        }).catch(next);
      } else res.status(401).send();
    } else res.status(400).send();
  }).catch(next);
}

// mark done controller
// role: Ad
const checked = (req, res, next) => {
  const {username, password} = req.body.user;

  User.findOne({username}).then(user => {
    if (user) {
      if (bcrypt.compareSync(password, user.password) && user.role == "Ad" ) {

        Order.findByIdAndUpdate({_id: req.params.id}, {status: "CHECKED"}).then(order => {
          if (order) {
            res.send(order);
          } else res.status(402).send();
        }).catch(next);
      } else res.status(401).send();
    } else res.status(400).send();
  }).catch(next);
}

// new cart
// role: own user
const createCart = (req, res, next) => {
  const {username, password} = req.body.user;

  User.findOne({username}).then(user => {
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {

        Order.create({}).then(order => {
          if (order) {
            user.orders.push(order._id);
            user.save(err => {
              if (err) res.status(402).send();
              else res.send(order);
            })
          } else res.status(402).send();
        }).catch(next);
      } else res.status(401).send();
    } else res.status(400).send();
  }).catch(next);
}

// add to cart
// role: own user
const addToCart = (req, res, next) => {
  const {username, password} = req.body.user;
  const {itemId, cartId, number} = req.body;

  User.findOne({username}).then(user => {
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {

        Order.findOne({_id: cartId}).then(order => {
          if (order) {
            if (user._id.equals(order.ofUser)){
              Item.findOne({_id: itemId}).then(item => {

                if (item.number >= number) {
  
                  item.save(err => {
                    if (err) res.status(402).send();
                    else {
  
                      if (order.items.findIndex(it => it._id.equals(item._id)) != -1) {
                        order.items.filter(it => {
                          if (it._id.equals(item._id)) it.number += number;
                          return it;
                        })
                      } 
                      else {
                        item.number = number;
                        user.cart.push(item);
                      }
  
                      user.save(err => {
                        if (err) res.status(402).send();
                        else res.send(user);
                      })
                    }
                  })
                } else res.status(402).send();
              }).catch(next);
            }
          } else res.status(402).send();
        })

        
      } else res.status(401).send();
    } else res.status(400).send();
  }).catch(next);
}

const orderController = {
  order,
  getAll,
  get,
  _delete,
  checked, 
  addToCart,
  createCart,
  getOrdersOfUser
};

module.exports = orderController;
