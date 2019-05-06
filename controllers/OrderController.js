const User = require('../models/User');
const FBUser = require('../models/FBUser');
const Order = require('../models/Order');
const Item = require('../models/Item').Item;
const bcrypt = require('bcrypt');

// order controller
// role: own user
const order = (req, res, next) => {
  const {userId, type} = req.body;
  //console.log(username);

  if (type === "NOR") {
    User.findById({_id: userId}).then(user => {
      if (user) {
        Order.find({ofUser: user._id}).then(orders => {

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
                  if (order.items.length === 0) {
                    res.status(402).send();
                  } else {

                    Item.find({}).then(items => {
                      let check = true;
                      order.items.forEach(item => {
                        if (items.find(i => i._id.equals(item._id)).number >= item.number) {
                          items = items.map(i => {
                            if (i._id === item._id) {
                              i.number -= item.number;
                            }
                            return i;
                          })
                        } else {
                          check = false;
                        }                        
                      });

                      if (check) {
                        order.save(err => {
                          if (err) res.status(402).send();
                          else {
                            Order.create({
                              ofUser: user._id
                            }).then(ord => {
                              if (ord) {
                                items.save(err => {
                                  if (err) res.status(402).send();
                                  else res.send(order);
                                })
                              } else res.status(402).send();
                            }).catch(next);
                          }
                        });
                      } else res.status(402).send();
                    }).catch(next);                    
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
        Order.find({ofUser: user._id}).then(orders => {

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
                  if (order.items.length === 0) {
                    res.status(402).send();
                  } else {

                    Item.find({}).then(items => {
                      let check = true;
                      order.items.forEach(item => {
                        if (items.find(i => i._id.equals(item._id)).number >= item.number) {
                          items = items.map(i => {
                            if (i._id === item._id) {
                              i.number -= item.number;
                            }
                            return i;
                          })
                        } else {
                          check = false;
                        }                        
                      });

                      if (check) {
                        order.save(err => {
                          if (err) res.status(402).send();
                          else {
                            Order.create({
                              ofUser: user._id
                            }).then(ord => {
                              if (ord) {
                                items.save(err => {
                                  if (err) res.status(402).send();
                                  else res.send(order);
                                })
                              } else res.status(402).send();
                            }).catch(next);
                          }
                        });
                      } else res.status(402).send();
                    }).catch(next);                    
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

// get cart of user
// role: own user
const getCart = (req, res, next) => {
  const {userId, type} = req.body;

  if (type === "NORMAL") {
    User.findOne({
      _id: userId
    }).then(user => {
      if (user) {     
        Order.findOne({ofUser: user._id, status: "CART"}).then(order => {
          if (order) {
            res.send(order);
          } else res.status(402).send();
        }).catch(next);
  
      } else res.status(400).send();
    }).catch(next);
  } else {

    FBUser.findOne({
      fbId: userId
    }).then(user => {
      if (user) {     
        Order.findOne({ofUser: user._id, status: "CART"}).then(order => {
          if (order) {
            res.send(order);
          } else res.status(402).send();
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
  const {itemId, number, userId, type} = req.body;

  if (type == "NORMAL") {
    User.findOne({_id: userId}).then(user => {
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
              //console.log(order);
              if (order) {
                Item.findById({_id: itemId}).then(item => {
                  if (item.number >= number) {
                    item.number -= number;
                    item.save(err => {
                      if (err) res.status(402).send();
                      else {
    
                        //console.log(order);
                        if (order.items.findIndex(it => it._id.equals(item._id)) != -1) {
                          order.items.filter(it => {
                            if (it._id.equals(item._id)) it.number += number;
                            return it;
                          })
                        } else {
                          item.number = number;
                          order.items.push(item);
                        }

                        order.total += number * item.price;
                        // console.log(number+" "+item.price);
    
                        order.save(err => {
                          console.log(err);
                          if (err) res.status(402).send();
                          else res.send(order);
                        })
                      }
                    })
                  } else res.status(402).send();
                }).catch(next);
              } else res.status(402).send();
            }).catch(next);
            
          } else res.status(402).send();
        }).then(next);
      } else res.status(400).send();
      
    }).catch(next);
  } else {
    console.log("fb");
    FBUser.findOne({fbId: userId}).then(user => {
      console.log(userId);
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
                Item.findById({_id: itemId}).then(item => {
                  console.log(item._id);
                  item.number = number;
                  
                  order.total += number * item.price;
  
                  order.save(err => {
                    if (err) res.status(402).send();
                    else res.send(order);
                  })
                }).catch(next);
              } else res.status(402).send();
            }).catch(next);
            
          } else res.status(402).send();
        }).then(next);
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
  getCart
};

module.exports = orderController;
