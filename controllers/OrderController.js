const User = require('../models/User');
const FBUser = require('../models/FBUser');
const Order = require('../models/Order');
const Item = require('../models/Item').Item;
const bcrypt = require('bcrypt');

// order controller
// role: own user
const order = (req, res, next) => {
  const {userId, type} = req.body.user;
  const {fullName, address, phone, payment} = req.body;
  //console.log(username);

  if (!fullName || !address || !phone || !payment) {
    res.status(404).send();
  } else {
    if (type === "NORMAL") {
      User.findById({_id: userId}).then(user => {
        if (user) {
          Order.find({ofUser: userId}).then(orders => {
  
            if (orders) {
              let cartId = "";
              orders.forEach(order => {
                if (order.status === "CART") {
                  cartId = order._id;
                }
              });
  
              Order.findById({_id: cartId}).then(order => {
                if (order) {
                  if (order.status === "CART") {
                    order.status = "ORDERED";
                    order.fullName = fullName;
                    order.address = address;
                    order.phone = phone;
                    order.payment = payment;
                    if (order.items.length === 0) {
                      res.status(402).send();
                    } else {
                      order.save(err => {
                        if (err) {
                          Order.create({
                            ofUser: userId
                          }).then(ord => {
                            if (ord) {
                              res.send(order);
                            } else res.status(402).send();
                          }).catch(next);
                        } else res.send(order);
                      })
                    }   
                  } else res.status(402).send();
                } else res.status(402).send();
              }).catch(next);
            }
            
          }).catch(next);
        } else res.status(400).send();
      }).catch(next);
    } else {
      FBUser.findOne({fbId: userId}).then(user => {
        if (user) {
          Order.find({ofUser: userId}).then(orders => {
  
            if (orders) {
              let cartId = "";
              orders.forEach(order => {
                if (order.status === "CART") {
                  cartId = order._id;
                }
              });
  
              console.log("cart ",cartId);

              Order.findById({_id: cartId}).then(order => {
                if (order) {
                  if (order.status === "CART") {
                    order.status = "ORDERED";
                    order.fullName = fullName;
                    order.address = address;
                    order.phone = phone;
                    order.payment = payment;
                    if (order.items.length === 0) {
                      res.status(402).send();
                    } else {
                      order.save(err => {
                        if (err) {
                          Order.create({
                            ofUser: userId
                          }).then(ord => {
                            if (ord) {        
                              console.log(ord);                    
                              res.send(order);
                            } else res.status(402).send();
                          }).catch(next);
                        } else res.send(order);
                      })                  
                    }   
                  } else res.status(402).send();
                } else res.status(402).send();
              }).catch(next);
            }
            
          }).catch(next);
        } else res.status(400).send();
      }).catch(next);
    }
  }

  
}

// delete item from cart
// role: own user
const deleteItemFromCart = (req, res, next) => {
  const {type, userId} = req.body;
  const {itemId} = req.params;

  console.log("user ", userId);
  if (type === "NORMAL") {
    User.findById({_id: userId}).then(user => {
      if (user) {
        Order.findOne({ofUser: userId, status: "CART"}).then(cart => {
          let num = 0;
          let price = 0;
          let ind = -1;
          
          for (let i = 0; i < cart.items.length; i++) {
            if (cart.items[i]._id.equals(itemId)) {
              num = cart.items[i].number;
              price = cart.items[i].price;
              ind = i;
              break;
            }
          }

          console.log("number: ",num);

          if (num !== 0) {

            if (ind != -1) cart.items.splice(ind, 1);
            cart.total -= price * num;
            //console.log(itemId);
  
            Item.findById({_id: itemId}).then(item => {
              //console.log(item);
              if (item) {
                item.number += num;
  
                item.save(err => {
                  if (err) res.status.send(402);
                  else {
                    cart.save(e => {
                      if (e) res.status.send(402);
                      else {
                        res.send(cart);
                      }
                    })
                  }
                })
              } else res.status(401).send();
            }).catch(next);
          } else res.status(403).send();
          
        }).catch(next);
      } else res.status(400).send();
    }).catch(next);
  } else {
    FBUser.findOne({fbId: userId}).then(user => {
      if (user) {
        Order.findOne({ofUser: userId, status: "CART"}).then(cart => {
          let num = 0;
          let price = 0;
          let ind = -1;
          
          for (let i = 0; i < cart.items.length; i++) {
            if (cart.items[i]._id.equals(itemId)) {
              num = cart.items[i].number;
              price = cart.items[i].price;
              ind = i;
              break;
            }
          }

          //console.log(num);

          if (num !== 0) {

            if (ind != -1) cart.items.splice(ind, 1);
            cart.total -= price * num;
            //console.log(itemId);
  
            Item.findById({_id: itemId}).then(item => {
              //console.log(item);
              if (item) {
                item.number += num;
  
                item.save(err => {
                  if (err) res.status.send(402);
                  else {
                    cart.save(e => {
                      if (e) res.status.send(402);
                      else {
                        res.send(cart);
                      }
                    })
                  }
                })
              } else res.status(401).send();
            }).catch(next);
          } else res.status(403).send();
          
        }).catch(next);
      } else res.status(400).send();
    }).catch(next);
  }
}

// get cart of user
// role: own user
const getCart = (req, res, next) => {
  const {userId, type} = req.body;

  if (type === "NORMAL") {
    User.findOne({
      _id: userId
    }).then(user => {
      if (user) {     
        Order.findOne({ofUser: userId, status: "CART"}).then(order => {
          if (order) {
            res.send(order);
          } else {
            Order.create({
              ofUser: userId
            }).then(ord => {
              if (ord) {
                res.send(ord);
              } else res.status(402).send();
            }).catch(next);
          }
        }).catch(next);
  
      } else res.status(400).send();
    }).catch(next);
  } else {

    FBUser.findOne({
      fbId: userId
    }).then(user => {
      if (user) {     
        Order.findOne({ofUser: userId, status: "CART"}).then(order => {
          if (order) {
            res.send(order);
          } else {
            Order.create({
              ofUser: userId
            }).then(ord => {
              if (ord) {                
                res.send(ord);
              } else res.status(402).send();
            }).catch(next);
          }
        }).catch(next);
  
      } else res.status(400).send();
    }).catch(next);
  }
  
  
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

        Order.findById({_id: req.params.id}).then(o => {
          if (o) {
            if (o.status === "ORDERED") {
              Order.findByIdAndUpdate({_id: req.params.id}, {status: "CHECKED"}).then(order => {
                if (order) {
                  res.send(order);
                } else res.status(402).send();
              }).catch(next);
            } else res.status(402).send();
            
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
  const {itemId, number} = req.body;
  const {userId, type} = req.body.user;

  if (type === "NORMAL") {
    User.findById({_id: userId}).then(user => {
      if (user) {
        Order.find({ofUser: userId}).then(orders =>{
          if (orders) {
            Item.findById({_id: itemId}).then(item => {
              if (item) {
                if (item.number >= number) {
                  let cartId = "";

                  for (let i = 0; i < orders.length; i++) {
                    if (orders[i].status === "CART") {
                      cartId = orders[i]._id;
                      break;
                    }
                  }

                  // console.log(cartId);
                  if (cartId !== "") {
                    Order.findById({_id: cartId}).then(order => {
                      if (order) {
                        // console.log(item.number);
                        item.number -= number;
                        item.save(err => {
                          // console.log(err);
                          if (err) res.status(403).send();
                          else {
                            console.log("motherfucker")
                            if (order.items.findIndex(it => it._id.equals(item._id)) != -1) {
                              console.log("in");
                              order.items.filter(it => {
                                if (it._id.equals(item._id)) it.number += number;
                                return it;
                              })
                            } else {
                              console.log("out");
                              item.number = number;
                              order.items.push(item);
                            }

                            order.total += number * item.price;

                            order.save(err => {
                              if (err) res.status(403).send();
                              else {
                                res.send(order);
                              }
                            })
                          }
                        })
                      } else res.status(403).send();
                    }).catch(next);
                  } else res.status(403).send();
                } else res.status(403).send();
              } else res.status(402).send();
            }).catch(next);
          } else res.status(401).send();
          
        }).catch(next);
      } else res.status(400).send();
    }).catch(next);
  } else {
    FBUser.findOne({fbId: userId}).then(user => {
      if (user) {
        Order.find({ofUser: userId}).then(orders =>{
          if (orders) {
            Item.findById({_id: itemId}).then(item => {
              if (item) {
                if (item.number >= number) {
                  let cartId = "";

                  for (let i = 0; i < orders.length; i++) {
                    if (orders[i].status === "CART") {
                      cartId = orders[i]._id;
                      break;
                    }
                  }

                  // console.log(cartId);
                  if (cartId !== "") {
                    Order.findById({_id: cartId}).then(order => {
                      if (order) {
                        // console.log(item.number);
                        item.number -= number;
                        item.save(err => {
                          // console.log(err);
                          if (err) res.status(403).send();
                          else {
                            console.log("motherfucker")
                            if (order.items.findIndex(it => it._id.equals(item._id)) != -1) {
                              console.log("in");
                              order.items.filter(it => {
                                if (it._id.equals(item._id)) it.number += number;
                                return it;
                              })
                            } else {
                              console.log("out");
                              item.number = number;
                              order.items.push(item);
                            }

                            order.total += number * item.price;

                            order.save(err => {
                              if (err) res.status(403).send();
                              else {
                                res.send(order);
                              }
                            })
                          }
                        })
                      } else res.status(403).send();
                    }).catch(next);
                  } else res.status(403).send();
                } else res.status(403).send();
              } else res.status(402).send();
            }).catch(next);
          } else res.status(401).send();
          
        }).catch(next);
      } else res.status(400).send();
    }).catch(next);
  }

}

const orderController = {
  order,
  getAll,
  get,
  _delete,
  checked, 
  addToCart,
  createCart,
  getOrdersOfUser,
  getCart,
  deleteItemFromCart
};

module.exports = orderController;
